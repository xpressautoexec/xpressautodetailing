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
    const services: string[] = Array.isArray(r.services) && r.services.length ? r.services : [r.need].filter(Boolean);
    const category = r.vehicle_category || r.vehicle_type;
    const ymm = [r.vehicle_year, r.vehicle_make, r.vehicle_model].filter(Boolean).join(" ");
    const vehicleLine = [ymm, `${category ?? ""}${r.length_ft ? `, ${r.length_ft} ft` : ""}`].filter(Boolean).join(" — ");
    const where =
      r.location_pref === "shop"
        ? "Drop-off at the Airdrie shop"
        : r.location_pref === "mobile"
          ? `Mobile${r.area ? ` · ${r.area}` : ""}`
          : r.location_pref === "either"
            ? `Shop or mobile${r.area ? ` · ${r.area}` : ""}`
            : r.area;

    const row = (k: string, v: unknown) =>
      v ? `<tr><td style="padding:7px 14px 7px 0;color:#6b7280;white-space:nowrap;vertical-align:top">${esc(k)}</td><td style="padding:7px 0;color:#1f2329;font-weight:600;white-space:pre-line">${esc(v)}</td></tr>` : "";

    const attribution = [
      ["How they heard", r.heard_from],
      ["gclid", r.gclid],
      ["gbraid", r.gbraid],
      ["wbraid", r.wbraid],
      ["fbclid", r.fbclid],
      ["utm_source", r.utm_source],
      ["utm_medium", r.utm_medium],
      ["utm_campaign", r.utm_campaign],
      ["utm_term", r.utm_term],
      ["utm_content", r.utm_content],
      ["Landing page", r.landing_page],
      ["Referrer", r.referrer],
      ["Form", r.source],
      ["Form on", r.page_url || r.page_path],
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
      : `<p style="margin:24px 0 0;color:#6b7280">No photos uploaded.</p>`;

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;color:#1f2329">
        <p style="margin:0 0 4px;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#1d4ed8;font-weight:700">New quote request</p>
        <h2 style="margin:0 0 4px;font-size:22px">${esc(vehicleLine || category)}</h2>
        <p style="margin:0 0 16px;color:#374151">${esc(services.join(", "))}</p>
        <p style="margin:0 0 18px">
          <a href="tel:+1${phone}" style="display:inline-block;background:#1d4ed8;color:#fff;text-decoration:none;font-weight:700;padding:12px 18px;border-radius:6px;margin-right:8px">Call ${esc(r.phone)}</a>
          ${r.email ? `<a href="mailto:${esc(r.email)}" style="display:inline-block;border:1px solid #1f2329;color:#1f2329;text-decoration:none;font-weight:700;padding:11px 18px;border-radius:6px">Email</a>` : ""}
        </p>
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px">
          ${row("Name", r.name)}
          ${row("Phone", r.phone)}
          ${row("Email", r.email)}
          ${row("Contact by", r.contact_pref)}
          ${row("Vehicle", vehicleLine)}
          ${row("Colour", r.vehicle_color)}
          ${row("Company", r.company_name)}
          ${row("Fleet size", r.fleet_size)}
          ${row("Services", services.join("\n"))}
          ${row("Where", where)}
          ${row("When", r.timing)}
          ${row("Notes", r.notes)}
        </table>
        ${photoHtml}
        <p style="margin:28px 0 6px;font-weight:700;color:#1f2329;font-size:13px">Where this lead came from</p>
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:12px">${attribution || row("Source", "Direct / not tagged")}</table>
        <p style="margin:24px 0 0;font-size:11px;color:#9ca3af">Lead ${esc(r.id)} · ${esc(new Date(r.created_at ?? Date.now()).toLocaleString("en-CA", { timeZone: "America/Edmonton" }))}</p>
      </div>`;

    const send = (payload: Record<string, unknown>) =>
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

    const res = await send({
      from: FROM,
      to: TO,
      reply_to: r.email || undefined,
      subject: `Quote: ${vehicleLine || category} · ${services[0] ?? ""}${services.length > 1 ? ` +${services.length - 1}` : ""} · ${r.name}`,
      html,
      attachments: photos.map((p) => ({ filename: p.name, path: p.url })),
    });

    // Confirmation to the customer. A failure here never blocks the internal lead email.
    if (r.email && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(r.email))) {
      const by = r.contact_pref === "Call" ? "phone" : r.contact_pref === "Text" ? "text" : "email";
      const crow = (k: string, v: unknown) =>
        v ? `<tr><td style="padding:8px 16px 8px 0;color:#6b7280;white-space:nowrap;vertical-align:top">${esc(k)}</td><td style="padding:8px 0;color:#1f2329;font-weight:600;white-space:pre-line">${esc(v)}</td></tr>` : "";
      const confirmHtml = `
      <div style="background:#f5f7fa;padding:32px 16px;font-family:Arial,sans-serif">
        <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e5e8ee;border-radius:12px;overflow:hidden">
          <div style="background:#1f2329;padding:22px 28px">
            <p style="margin:0;color:#ffffff;font-size:18px;font-weight:800;letter-spacing:0.5px">XPRESS AUTO &amp; RV DETAILING</p>
          </div>
          <div style="height:4px;background:#1d4ed8"></div>
          <div style="padding:28px">
            <h1 style="margin:0 0 10px;font-size:24px;color:#1f2329">Thanks, ${esc(firstName)}. We've got your request.</h1>
            <p style="margin:0 0 22px;font-size:15px;line-height:1.6;color:#374151">
              Our team is reviewing the details and will reach out by ${by} shortly with your price. Here's what you sent us:
            </p>
            <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;width:100%;background:#f5f7fa;border-radius:8px">
              <tr><td style="padding:6px 16px" colspan="2"></td></tr>
              ${crow("Vehicle", vehicleLine)}
              ${crow("Services", services.join("\n"))}
              ${crow("Where", where)}
              ${crow("When", r.timing)}
              ${crow("Notes", r.notes)}
              <tr><td style="padding:6px 16px" colspan="2"></td></tr>
            </table>
            <p style="margin:24px 0 8px;font-size:15px;line-height:1.6;color:#374151">Need to add something or have a question? Reply to this email or give us a call.</p>
            <p style="margin:18px 0 0">
              <a href="tel:+15875004523" style="display:inline-block;background:#1d4ed8;color:#ffffff;text-decoration:none;font-weight:700;padding:13px 22px;border-radius:999px">Call 587-500-4523</a>
            </p>
          </div>
          <div style="border-top:1px solid #e5e8ee;padding:18px 28px;font-size:12px;line-height:1.6;color:#6b7280">
            Xpress Auto &amp; RV Detailing · Unit 2012, 529 Gateway Rd NE, Airdrie, AB<br/>
            Mobile service across Calgary, Airdrie, Cochrane, Chestermere, Okotoks and Rocky View County<br/>
            <a href="https://xpressautodetail.ca" style="color:#1d4ed8">xpressautodetail.ca</a> · support@xpressautodetail.ca
          </div>
        </div>
      </div>`;
      const c = await send({
        from: "Xpress Auto & RV Detailing <noreply@xpressautodetail.ca>",
        to: [String(r.email)],
        reply_to: "support@xpressautodetail.ca",
        subject: "We've got your quote request | Xpress Auto & RV Detailing",
        html: confirmHtml,
      });
      if (!c.ok) console.error(`Customer confirmation failed [${c.status}]:`, await c.text());
    }

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
