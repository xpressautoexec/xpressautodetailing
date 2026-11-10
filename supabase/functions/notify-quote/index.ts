import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

/**
 * Emails each new quote request to support@xpressautodetail.ca, with the customer's photos
 * attached and linked (signed links, valid 30 days). Called only by the quote_requests
 * insert trigger, which sends the shared vault secret.
 */

const TO = ["support@xpressautodetail.ca"];
const FROM = "Xpress Quote Leads <noreply@xpressautodetail.ca>";
const BUCKET = "quote-photos";
const LINK_TTL = 60 * 60 * 24 * 30;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const esc = (s: unknown): string =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const digits = (s: unknown) => String(s ?? "").replace(/\D/g, "");

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
      const res = await fetch(`${SUPABASE_URL}/storage/v1/object/sign/${BUCKET}/${p.split("/").map(encodeURIComponent).join("/")}`, {
        method: "POST",
        headers: auth,
        body: JSON.stringify({ expiresIn: LINK_TTL }),
      });
      if (!res.ok) {
        console.error("Sign failed", p, res.status, await res.text());
        continue;
      }
      const { signedURL } = await res.json();
      if (signedURL) photos.push({ name: p.split("/").pop() ?? "photo.jpg", url: `${SUPABASE_URL}/storage/v1${signedURL}` });
    }

    const phone = digits(r.phone);
    const firstName = String(r.name ?? "").trim().split(/\s+/)[0] || "there";
    const smsBody = encodeURIComponent(`Hi ${firstName}, it's Xpress Auto & RV Detailing about your quote request.`);
    const pref = r.location_pref === "shop" ? "Airdrie shop (drop-off)" : r.location_pref === "mobile" ? "Mobile (we go to them)" : "";

    const row = (k: string, v: unknown) =>
      v ? `<tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;vertical-align:top">${esc(k)}</td><td style="padding:6px 0;color:#1f2329;font-weight:600">${esc(v)}</td></tr>` : "";

    const attribution = [
      ["gclid", r.gclid],
      ["gbraid", r.gbraid],
      ["wbraid", r.wbraid],
      ["utm_source", r.utm_source],
      ["utm_medium", r.utm_medium],
      ["utm_campaign", r.utm_campaign],
      ["utm_term", r.utm_term],
      ["utm_content", r.utm_content],
      ["Landing page", r.landing_page],
      ["Referrer", r.referrer],
      ["Form on", r.page_path],
    ]
      .map(([k, v]) => row(k as string, v))
      .join("");

    const photoHtml = photos.length
      ? `<p style="margin:24px 0 8px;font-weight:700;color:#1f2329">Photos (${photos.length})</p>
         <div>${photos
           .map(
             (p, i) =>
               `<a href="${esc(p.url)}" style="display:inline-block;margin:0 8px 8px 0"><img src="${esc(p.url)}" alt="Photo ${i + 1}" width="180" style="width:180px;height:auto;border:1px solid #e5e8ee;border-radius:4px" /></a>`,
           )
           .join("")}</div>
         <p style="margin:4px 0 0;font-size:12px;color:#6b7280">Links work for 30 days. Photos are also attached.</p>`
      : `<p style="margin:24px 0 0;color:#b45309;font-weight:600">No photos uploaded. Ask for 3 by text.</p>`;

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;color:#1f2329">
        <p style="margin:0 0 4px;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#1d4ed8;font-weight:700">New quote request</p>
        <h2 style="margin:0 0 16px;font-size:22px">${esc(r.vehicle_type)} · ${esc(r.need)}</h2>
        <p style="margin:0 0 18px">
          <a href="sms:+1${phone}?&body=${smsBody}" style="display:inline-block;background:#1d4ed8;color:#fff;text-decoration:none;font-weight:700;padding:12px 18px;border-radius:6px;margin-right:8px">Text ${esc(r.phone)}</a>
          <a href="tel:+1${phone}" style="display:inline-block;border:1px solid #1f2329;color:#1f2329;text-decoration:none;font-weight:700;padding:11px 18px;border-radius:6px">Call</a>
        </p>
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px">
          ${row("Name", r.name)}
          ${row("Phone", r.phone)}
          ${row("Vehicle", r.vehicle_type)}
          ${row("Needs", r.need)}
          ${row("Area / postal", r.area)}
          ${row("Prefers", pref)}
          ${row("Company", r.company_name)}
          ${row("Fleet size", r.fleet_size)}
          ${row("Notes", r.notes)}
        </table>
        ${photoHtml}
        <p style="margin:28px 0 6px;font-weight:700;color:#1f2329;font-size:13px">Where this lead came from</p>
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:12px">${attribution || row("Source", "Direct / not tagged")}</table>
        <p style="margin:24px 0 0;font-size:11px;color:#9ca3af">Lead ${esc(r.id)} · ${esc(new Date(r.created_at ?? Date.now()).toLocaleString("en-CA", { timeZone: "America/Edmonton" }))}</p>
      </div>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: TO,
        subject: `Quote: ${r.vehicle_type} · ${r.need} · ${r.name}${photos.length ? ` · ${photos.length} photo${photos.length > 1 ? "s" : ""}` : ""}`,
        html,
        attachments: photos.map((p) => ({ filename: p.name, path: p.url })),
      }),
    });

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
