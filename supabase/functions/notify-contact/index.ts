import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { BRAND, FROM_CUSTOMER, FROM_LEADS, isRealEmail, sendEmail } from "../_shared/email.ts";
import { contactCustomer, contactStaff } from "../_shared/templates.ts";

/**
 * Emails each contact_submissions row (general, fleet, training, and the quote-form fallback)
 * to the team and sends the customer a branded confirmation. Called only by the
 * contact_submissions insert trigger, which sends the shared vault secret.
 */

const TO = ["xpressautoexec@gmail.com"];

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-notify-secret, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const provided = req.headers.get("x-notify-secret");
    if (!provided) return json({ success: false, error: "Unauthorized" }, 401);

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !RESEND_API_KEY) {
      console.error("Missing env: SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY / RESEND_API_KEY");
      return json({ success: false, error: "Internal error" }, 500);
    }

    const secretRes = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_notify_contact_secret`, {
      method: "POST",
      headers: { apikey: SERVICE_ROLE_KEY, Authorization: `Bearer ${SERVICE_ROLE_KEY}`, "Content-Type": "application/json" },
      body: "{}",
    });
    const expected = secretRes.ok ? await secretRes.json() : null;
    if (typeof expected !== "string" || !expected || provided !== expected) {
      return json({ success: false, error: "Unauthorized" }, 401);
    }

    const { record } = await req.json();
    if (!record) return json({ success: false, error: "No record" }, 400);

    const staff = contactStaff(record);
    const res = await sendEmail(RESEND_API_KEY, {
      from: FROM_LEADS,
      to: TO,
      reply_to: isRealEmail(record.email) ? record.email : undefined,
      subject: staff.subject,
      html: staff.html,
    });

    if (isRealEmail(record.email)) {
      const mail = contactCustomer(record);
      const c = await sendEmail(RESEND_API_KEY, {
        from: FROM_CUSTOMER,
        to: [String(record.email)],
        reply_to: BRAND.email,
        subject: mail.subject,
        html: mail.html,
      });
      if (!c.ok) console.error(`Auto-reply failed [${c.status}]:`, await c.text());
    }

    if (!res.ok) {
      console.error(`Resend error [${res.status}]:`, await res.text());
      return json({ success: false, error: "Notification failed" }, 500);
    }
    return json({ success: true });
  } catch (e) {
    console.error("notify-contact error:", e);
    return json({ success: false, error: "Internal error" }, 500);
  }
});
