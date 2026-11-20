/**
 * Shared email template for every form email the site sends (customer confirmations and
 * internal lead alerts). Matches the main site: white base, warm surface, deep-navy ink,
 * logo-blue rules, darker action-blue pill buttons, uppercase display headings.
 *
 * Email clients ignore most CSS, so everything is table-based with inline styles.
 * Claims used here must match src/data/brand.ts and src/data/copy.ts (verified only).
 */

export const BRAND = {
  name: "Xpress Auto & RV Detailing",
  site: "https://xpressautodetail.ca",
  logo: "https://xpressautodetail.ca/xpress-logo-dark.png",
  phone: "587-500-4523",
  phoneHref: "tel:+15875004523",
  email: "support@xpressautodetail.ca",
  hours: "Monday to Sunday, 9 AM to 5 PM",
  areas: "Calgary, Airdrie, Cochrane, Chestermere, Okotoks and Rocky View County",
  shop: "Unit 2012, 529 Gateway Rd NE, Airdrie, AB T4B 0J6",
  shopMaps: "https://www.google.com/maps/search/?api=1&query=529+Gateway+Rd+NE+Unit+2012+Airdrie+AB+T4B+0J6",
  instagram: "https://www.instagram.com/xpressauto.yyc",
  instagramHandle: "@xpressauto.yyc",
  reviews: "https://share.google/2MMngu3EuRPVNRLFP",
  booking: "https://xpressauto.fieldd.co/",
  installer: "Authorized SunTek, CARPRO and ExoShield installer",
};

/** Site tokens as hex (src/index.css, .main-site). */
export const C = {
  ink: "#0A193E",
  text: "#1F1F1F",
  muted: "#5F6470",
  faint: "#8A8F99",
  primary: "#38B6FF",
  action: "#0068AD",
  surface: "#F7F6F3",
  border: "#E1DFDB",
  white: "#FFFFFF",
  warn: "#B45309",
};

const DISPLAY = `'Unbounded','Arial Black',Arial,Helvetica,sans-serif`;
const BODY = `'Sofia Sans',-apple-system,'Segoe UI',Arial,Helvetica,sans-serif`;

export const esc = (s: unknown): string =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const digits = (s: unknown) => String(s ?? "").replace(/\D/g, "");

export const isRealEmail = (s: unknown) =>
  typeof s === "string" &&
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s) &&
  !/@xpressautodetail\.ca$/i.test(s); // placeholder addresses the site uses when no email was given

export const firstName = (name: unknown) => String(name ?? "").trim().split(/\s+/)[0] || "there";

export const refCode = (id: unknown) => String(id ?? "").replace(/-/g, "").slice(0, 8).toUpperCase();

export const stamp = (d?: unknown) =>
  new Date((d as string) ?? Date.now()).toLocaleString("en-CA", {
    timeZone: "America/Edmonton",
    dateStyle: "medium",
    timeStyle: "short",
  });

/* ---------- building blocks ---------- */

export const button = (label: string, href: string, kind: "solid" | "outline" = "solid") =>
  kind === "solid"
    ? `<a href="${esc(href)}" style="display:inline-block;background:${C.action};color:${C.white};font-family:${BODY};font-size:15px;font-weight:700;text-decoration:none;padding:14px 26px;border-radius:999px;mso-padding-alt:0;margin:0 8px 10px 0">${esc(label)}</a>`
    : `<a href="${esc(href)}" style="display:inline-block;background:${C.white};color:${C.ink};font-family:${BODY};font-size:15px;font-weight:700;text-decoration:none;padding:12px 24px;border-radius:999px;border:2px solid ${C.ink};margin:0 8px 10px 0">${esc(label)}</a>`;

/** Small uppercase label with the blue rule above it, like the site's section eyebrows. */
export const label = (text: string) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="width:32px;height:3px;background:${C.primary};font-size:0;line-height:0">&nbsp;</td></tr></table>
   <p style="margin:10px 0 14px;font-family:${BODY};font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${C.action}">${esc(text)}</p>`;

export const section = (heading: string, inner: string, pad = "28px 36px 4px") =>
  `<tr><td class="px" style="padding:${pad}">${label(heading)}${inner}</td></tr>`;

export const p = (html: string, extra = "") =>
  `<p style="margin:0 0 14px;font-family:${BODY};font-size:15px;line-height:1.65;color:${C.text};${extra}">${html}</p>`;

/** Key/value table on the warm surface. Empty values are skipped. */
export const details = (rows: [string, unknown][]) => {
  const body = rows
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "")
    .map(
      ([k, v], i) =>
        `<tr><td style="padding:11px 16px 11px 18px;${i ? `border-top:1px solid ${C.border};` : ""}font-family:${BODY};font-size:13px;color:${C.muted};white-space:nowrap;vertical-align:top;width:120px">${esc(k)}</td><td style="padding:11px 18px 11px 0;${i ? `border-top:1px solid ${C.border};` : ""}font-family:${BODY};font-size:14px;font-weight:600;color:${C.ink};white-space:pre-line;vertical-align:top">${esc(v)}</td></tr>`,
    )
    .join("");
  return body
    ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:separate;background:${C.surface};border:1px solid ${C.border};border-radius:14px">${body}</table>`
    : "";
};

/** Numbered 01, 02, 03 steps, like the Xpress Process on the site. */
export const steps = (items: { t: string; d: string }[]) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">${items
    .map(
      (s, i) =>
        `<tr><td valign="top" style="padding:0 16px 18px 0;width:40px;font-family:${DISPLAY};font-size:20px;font-weight:700;color:${C.primary};line-height:1.2">${String(i + 1).padStart(2, "0")}</td>
         <td valign="top" style="padding:0 0 18px 0;border-left:1px solid ${C.border};padding-left:16px">
           <p style="margin:2px 0 4px;font-family:${BODY};font-size:15px;font-weight:700;color:${C.ink}">${esc(s.t)}</p>
           <p style="margin:0;font-family:${BODY};font-size:14px;line-height:1.6;color:${C.muted}">${esc(s.d)}</p>
         </td></tr>`,
    )
    .join("")}</table>`;

/** Short bulleted "good to know" list with blue square markers. */
export const bullets = (items: { t: string; d: string }[]) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">${items
    .map(
      (b) =>
        `<tr><td valign="top" style="padding:7px 12px 12px 0;width:8px"><div style="width:8px;height:8px;background:${C.primary};font-size:0;line-height:0">&nbsp;</div></td>
         <td valign="top" style="padding:0 0 12px 0;font-family:${BODY};font-size:14px;line-height:1.6;color:${C.text}"><strong style="color:${C.ink}">${esc(b.t)}</strong> ${esc(b.d)}</td></tr>`,
    )
    .join("")}</table>`;

/** Quoted customer message. */
export const quoteBlock = (text: unknown) =>
  `<div style="background:${C.surface};border:1px solid ${C.border};border-left:4px solid ${C.primary};border-radius:10px;padding:16px 18px;font-family:${BODY};font-size:14px;line-height:1.65;color:${C.text};white-space:pre-wrap">${esc(text)}</div>`;

/* ---------- full layouts ---------- */

type Shell = {
  preheader: string;
  eyebrow: string;
  title: string;
  intro?: string;
  body: string; // rows built with section()
  footer: string; // rows
  ref?: string;
};

const shell = ({ preheader, eyebrow, title, intro, body, footer, ref }: Shell) => `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light only">
<title>${esc(title)}</title>
<link href="https://fonts.googleapis.com/css2?family=Sofia+Sans:wght@400;600;700&family=Unbounded:wght@500;700&display=swap" rel="stylesheet">
<style>
  @media (max-width:620px){ .px{padding-left:22px!important;padding-right:22px!important} .h1{font-size:22px!important} .stack{display:block!important;width:100%!important;padding:0 0 14px!important;border:0!important} }
  a{color:${C.action}}
</style>
</head>
<body style="margin:0;padding:0;background:${C.surface};-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.surface}">${esc(preheader)}&#8202;&zwnj;&nbsp;&#8202;&zwnj;&nbsp;&#8202;&zwnj;&nbsp;</div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${C.surface}">
<tr><td align="center" style="padding:28px 12px 40px">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:100%;max-width:600px;background:${C.white};border:1px solid ${C.border};border-radius:18px;overflow:hidden">
    <tr><td class="px" style="padding:24px 36px 20px">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
        <td valign="middle"><a href="${BRAND.site}"><img src="${BRAND.logo}" alt="${esc(BRAND.name)}" width="150" style="display:block;width:150px;height:auto;border:0"></a></td>
        <td valign="middle" align="right" style="font-family:${BODY};font-size:13px;font-weight:700;color:${C.ink}"><a href="${BRAND.phoneHref}" style="color:${C.ink};text-decoration:none">${BRAND.phone}</a>${ref ? `<br><span style="font-weight:600;font-size:11px;letter-spacing:1px;color:${C.faint}">REF ${esc(ref)}</span>` : ""}</td>
      </tr></table>
    </td></tr>
    <tr><td style="height:4px;background:${C.primary};font-size:0;line-height:0">&nbsp;</td></tr>
    <tr><td class="px" style="padding:34px 36px 6px">
      <p style="margin:0 0 12px;font-family:${BODY};font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${C.action}">${esc(eyebrow)}</p>
      <h1 class="h1" style="margin:0 0 14px;font-family:${DISPLAY};font-size:26px;line-height:1.2;font-weight:500;text-transform:uppercase;color:${C.ink}">${title}</h1>
      ${intro ? `<p style="margin:0 0 6px;font-family:${BODY};font-size:16px;line-height:1.65;color:${C.text}">${intro}</p>` : ""}
    </td></tr>
    ${body}
    ${footer}
  </table>
</td></tr></table>
</body></html>`;

/** Dark "need us sooner" band + full contact footer for customers. */
const customerFooter = () => `
    <tr><td class="px" style="padding:30px 36px 34px">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${C.ink};border-radius:16px">
        <tr><td style="padding:26px 26px 18px">
          <p style="margin:0 0 6px;font-family:${BODY};font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${C.primary}">Questions before we call?</p>
          <p style="margin:0 0 6px;font-family:${DISPLAY};font-size:22px;font-weight:500;color:${C.white}"><a href="${BRAND.phoneHref}" style="color:${C.white};text-decoration:none">${BRAND.phone}</a></p>
          <p style="margin:0 0 18px;font-family:${BODY};font-size:14px;line-height:1.6;color:#C9D2E3">Call us, or reply to this email and it comes straight to our team. ${BRAND.hours}.</p>
          <a href="${BRAND.phoneHref}" style="display:inline-block;background:${C.white};color:${C.ink};font-family:${BODY};font-size:14px;font-weight:700;text-decoration:none;padding:12px 22px;border-radius:999px;margin:0 8px 8px 0">Call ${BRAND.phone}</a>
          <a href="mailto:${BRAND.email}" style="display:inline-block;border:2px solid #4A5878;color:${C.white};font-family:${BODY};font-size:14px;font-weight:700;text-decoration:none;padding:10px 20px;border-radius:999px;margin:0 8px 8px 0">Email us</a>
        </td></tr>
      </table>
    </td></tr>
    <tr><td class="px" style="padding:0 36px 8px">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top:1px solid ${C.border}"><tr>
        <td class="stack" valign="top" width="50%" style="padding:22px 12px 0 0;font-family:${BODY};font-size:13px;line-height:1.65;color:${C.muted}">
          <strong style="color:${C.ink};font-size:12px;letter-spacing:1.5px;text-transform:uppercase">Airdrie shop</strong><br>
          ${esc(BRAND.shop)}<br>
          <a href="${BRAND.shopMaps}" style="color:${C.action};font-weight:700;text-decoration:none">Get directions</a>
        </td>
        <td class="stack" valign="top" width="50%" style="padding:22px 0 0 12px;font-family:${BODY};font-size:13px;line-height:1.65;color:${C.muted}">
          <strong style="color:${C.ink};font-size:12px;letter-spacing:1.5px;text-transform:uppercase">Mobile service</strong><br>
          ${esc(BRAND.areas)}<br>
          ${esc(BRAND.hours)}
        </td>
      </tr></table>
    </td></tr>
    <tr><td class="px" style="padding:20px 36px 30px">
      <p style="margin:0 0 10px;font-family:${BODY};font-size:12px;line-height:1.6;color:${C.muted}">100+ five-star Google reviews &middot; $2M liability coverage &middot; ${esc(BRAND.installer)}</p>
      <p style="margin:0;font-family:${BODY};font-size:12px;line-height:1.6;color:${C.faint}">
        <a href="${BRAND.site}" style="color:${C.action};text-decoration:none;font-weight:700">xpressautodetail.ca</a> &middot;
        <a href="${BRAND.instagram}" style="color:${C.action};text-decoration:none;font-weight:700">Instagram ${BRAND.instagramHandle}</a> &middot;
        <a href="${BRAND.reviews}" style="color:${C.action};text-decoration:none;font-weight:700">Google reviews</a><br>
        You're receiving this because you sent a request on xpressautodetail.ca. &copy; ${new Date().getFullYear()} ${esc(BRAND.name)}.
      </p>
    </td></tr>`;

const staffFooter = (meta: string) => `
    <tr><td class="px" style="padding:26px 36px 30px">
      <p style="margin:0;padding-top:16px;border-top:1px solid ${C.border};font-family:${BODY};font-size:11px;line-height:1.6;color:${C.faint}">${meta}<br>Internal alert from the xpressautodetail.ca forms. Hit reply to answer the customer directly.</p>
    </td></tr>`;

export const customerEmail = (o: Omit<Shell, "footer">) => shell({ ...o, footer: customerFooter() });
export const staffEmail = (o: Omit<Shell, "footer"> & { meta: string }) => shell({ ...o, footer: staffFooter(o.meta) });

/** Block shared by every customer email. Verified policy only (src/data/copy.ts). */
export const GOOD_TO_KNOW = [
  { t: "Mobile or drop-off.", d: "Our vans carry their own water and power, so we can work at your home, office or storage lot. You can also drop off at our heated Airdrie shop." },
  { t: "No payment until service.", d: "Your price is agreed before any work starts." },
  { t: "Free changes.", d: "Cancel or reschedule free up to 24 hours ahead (48 hours for RV, marine, correction, coating and fleet work)." },
  { t: "Photos help.", d: "Reply with a few photos of the areas you care about most and we can firm up your price faster." },
];

/** Staff action buttons: call, text, email. */
export const staffActions = (phone: unknown, email: unknown, smsText: string) => {
  const d = digits(phone);
  const tel = d.length === 10 ? `+1${d}` : d;
  return `<tr><td class="px" style="padding:12px 36px 4px">
    ${d ? button(`Call ${String(phone)}`, `tel:${tel}`) : ""}
    ${d ? button("Text", `sms:${tel}?&body=${encodeURIComponent(smsText)}`, "outline") : ""}
    ${isRealEmail(email) ? button("Email", `mailto:${String(email)}`, "outline") : ""}
  </td></tr>`;
};

/** Small grey attribution table for staff emails. */
export const attributionTable = (rows: [string, unknown][]) => {
  const body = rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 14px 4px 0;font-family:${BODY};font-size:12px;color:${C.faint};white-space:nowrap;vertical-align:top">${esc(k)}</td><td style="padding:4px 0;font-family:${BODY};font-size:12px;color:${C.muted};word-break:break-all">${esc(v)}</td></tr>`,
    )
    .join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0">${body || `<tr><td style="font-family:${BODY};font-size:12px;color:${C.muted}">Direct / not tagged</td></tr>`}</table>`;
};

export const photoGrid = (photos: { url: string }[]) =>
  photos.length
    ? `${photos
        .map(
          (ph, i) =>
            `<a href="${esc(ph.url)}" style="display:inline-block;margin:0 8px 8px 0"><img src="${esc(ph.url)}" alt="Photo ${i + 1}" width="164" style="width:164px;height:auto;border:1px solid ${C.border};border-radius:10px;display:block"></a>`,
        )
        .join("")}${p("Links work for 30 days. Photos are also attached.", `font-size:12px;color:${C.muted};margin-top:4px`)}`
    : p("No photos uploaded. Ask for a few when you call.", `color:${C.warn};font-weight:700`);

export async function sendEmail(apiKey: string, payload: Record<string, unknown>) {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export const FROM_CUSTOMER = `${BRAND.name} <noreply@xpressautodetail.ca>`;
export const FROM_LEADS = "Xpress Leads <noreply@xpressautodetail.ca>";
