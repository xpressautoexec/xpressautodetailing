import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { BRAND, FROM_CUSTOMER, FROM_LEADS, isRealEmail, sendEmail } from "../_shared/email.ts";
import { quoteCustomer, quoteStaff } from "../_shared/templates.ts";

/**
 * Emails each new quote request to support@ (photos attached and linked, signed links valid
 * 30 days) and sends the customer a branded confirmation. Called only by the quote_requests
 * insert trigger, which sends the shared vault secret.
 */

const TO = [BRAND.email];
const BUCKET = "quote-photos";
const LINK_TTL = 60 * 60 * 24 * 30;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

serve(async (req) => {
  if (req.method !== "POST") return json({ success: false }, 405);

  try {
    const provided = req.headers.get("x-notify-secret");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!provided) return json({ success: false, error: "Unauthorized" }, 401);
    if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !RESEND_API_KEY) {
      console.error("Missing env: SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY / RESEND_API_KEY");
      return json({ success: false, error: "Internal error" }, 500);
    }
    const auth = { apikey: SERVICE_ROLE_KEY, Authorization: `Bearer ${SERVICE_ROLE_KEY}`, "Content-Type": "application/json" };

    const secretRes = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_notify_contact_secret`, {
      method: "POST",
      headers: auth,
      body: "{}",
    });
    const expected = secretRes.ok ? await secretRes.json() : null;
    if (typeof expected !== "string" || !expected || provided !== expected) {
      return json({ success: false, error: "Unauthorized" }, 401);
    }

    const { record: r } = await req.json();
    if (!r?.id) return json({ success: false, error: "No record" }, 400);

    // Signed links for each photo.
    const paths: string[] = Array.isArray(r.photo_paths) ? r.photo_paths.slice(0, 6) : [];
    const photos: { name: string; url: string }[] = [];
    for (const p of paths) {
      const res = await fetch(
        `${SUPABASE_URL}/storage/v1/object/sign/${BUCKET}/${p.split("/").map(encodeURIComponent).join("/")}`,
        { method: "POST", headers: auth, body: JSON.stringify({ expiresIn: LINK_TTL }) },
      );
      if (!res.ok) {
        console.error("Sign failed", p, res.status, await res.text());
        continue;
      }
      const { signedURL } = await res.json();
      if (signedURL) photos.push({ name: p.split("/").pop() ?? "photo.jpg", url: `${SUPABASE_URL}/storage/v1${signedURL}` });
    }

    // Internal lead alert.
    const staff = quoteStaff(r, photos);
    const res = await sendEmail(RESEND_API_KEY, {
      from: FROM_LEADS,
      to: TO,
      reply_to: isRealEmail(r.email) ? r.email : undefined,
      subject: staff.subject,
      html: staff.html,
      attachments: photos.map((p) => ({ filename: p.name, path: p.url })),
    });

    // Customer confirmation. A failure here never blocks the internal lead email.
    if (isRealEmail(r.email)) {
      const mail = quoteCustomer(r);
      const c = await sendEmail(RESEND_API_KEY, {
        from: FROM_CUSTOMER,
        to: [String(r.email)],
        reply_to: BRAND.email,
        subject: mail.subject,
        html: mail.html,
      });
      if (!c.ok) console.error(`Customer confirmation failed [${c.status}]:`, await c.text());
    }

    if (!res.ok) {
      console.error(`Resend error [${res.status}]:`, await res.text());
      return json({ success: false, error: "Notification failed" }, 500);
    }
    return json({ success: true });
  } catch (e) {
    console.error("notify-quote error:", e);
    return json({ success: false, error: "Internal error" }, 500);
  }
});
