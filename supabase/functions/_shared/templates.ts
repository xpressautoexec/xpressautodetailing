/**
 * Every form email the site sends, built on the shared shell in ./email.ts.
 * Pure functions (no Deno APIs) so they can be previewed locally:
 *   bun scripts/preview-emails.ts
 */
import {
  BRAND,
  GOOD_TO_KNOW,
  attributionTable,
  bullets,
  customerEmail,
  details,
  esc,
  firstName,
  p,
  photoGrid,
  quoteBlock,
  refCode,
  section,
  staffActions,
  staffEmail,
  stamp,
  steps,
} from "./email.ts";

type Rec = Record<string, unknown>;

const FLEET_STEPS = [
  { t: "Yard walk", d: "We visit your yard or lot, look at the units and talk through how often they need service." },
  { t: "Per-unit rate in writing", d: "You get a written per-unit rate, a proposed rotation schedule and net terms that suit your accounts team." },
  { t: "Off-hours rotations", d: "Early mornings, evenings or weekends, so units stay on the road." },
  { t: "Invoicing your way", d: "A separate invoice for each unit, or one invoice with a per-unit breakdown. Net terms are agreed after the yard walk." },
];

/* ---------- quote_requests ---------- */

export function quoteFacts(r: Rec) {
  const services: string[] = Array.isArray(r.services) && r.services.length ? r.services : [r.need].filter(Boolean);
  const category = r.vehicle_category || r.vehicle_type || "";
  const ymm = [r.vehicle_year, r.vehicle_make, r.vehicle_model].filter(Boolean).join(" ");
  const vehicle = [ymm, `${category}${r.length_ft ? `, ${r.length_ft} ft` : ""}`].filter(Boolean).join(" · ");
  const where =
    r.location_pref === "shop"
      ? "Drop-off at the Airdrie shop"
      : r.location_pref === "mobile"
        ? `Mobile${r.area ? ` · ${r.area}` : ""}`
        : r.location_pref === "either"
          ? `Shop or mobile${r.area ? ` · ${r.area}` : ""}`
          : r.area;
  const isRv = /rv|trailer|motorhome|camper/i.test(String(category));
  const isFleet = /fleet/i.test(String(category));
  return { services, category, vehicle, where, isRv, isFleet };
}

export function quoteStaff(r: Rec, photos: { url: string }[]) {
  const f = quoteFacts(r);
  const subject = `Quote: ${f.vehicle || f.category} · ${f.services[0] ?? ""}${f.services.length > 1 ? ` +${f.services.length - 1}` : ""} · ${r.name}`;
  const html = staffEmail({
    preheader: `${r.name} · ${f.services.join(", ")} · ${r.phone}`,
    eyebrow: `New quote request${r.source ? ` · ${r.source}` : ""}`,
    title: esc(f.vehicle || f.category || "Quote request"),
    intro: esc(f.services.join(", ")),
    ref: refCode(r.id),
    body: [
      staffActions(r.phone, r.email, `Hi ${firstName(r.name)}, it's ${BRAND.name} about your quote request.`),
      section(
        "Customer",
        details([
          ["Name", r.name],
          ["Phone", r.phone],
          ["Email", r.email],
          ["Contact by", r.contact_pref],
          ["Company", r.company_name],
          ["Fleet size", r.fleet_size],
        ]),
      ),
      section(
        "Job",
        details([
          ["Vehicle", f.vehicle],
          ["Colour", r.vehicle_color],
          ["Services", f.services.join("\n")],
          ["Where", f.where],
          ["When", r.timing],
          ["Notes", r.notes],
        ]),
      ),
      section(`Photos${photos.length ? ` (${photos.length})` : ""}`, photoGrid(photos)),
      section(
        "Where this lead came from",
        attributionTable([
          ["How they heard", r.heard_from],
          ["Form", r.source],
          ["Form on", r.page_url || r.page_path],
          ["Landing page", r.landing_page],
          ["Referrer", r.referrer],
          ["gclid", r.gclid],
          ["gbraid", r.gbraid],
          ["wbraid", r.wbraid],
          ["fbclid", r.fbclid],
          ["utm_source", r.utm_source],
          ["utm_medium", r.utm_medium],
          ["utm_campaign", r.utm_campaign],
          ["utm_term", r.utm_term],
          ["utm_content", r.utm_content],
        ]),
      ),
    ].join(""),
    meta: `Lead ${esc(r.id)} · ${esc(stamp(r.created_at))}`,
  });
  return { subject, html };
}

export function quoteCustomer(r: Rec) {
  const f = quoteFacts(r);
  const by = r.contact_pref === "Call" ? "phone" : r.contact_pref === "Text" ? "text" : r.contact_pref === "Email" ? "email" : "phone or email";
  const html = customerEmail({
    preheader: `We've got your request for ${f.services[0] ?? "your vehicle"}. Here's what happens next.`,
    eyebrow: "Quote request received",
    title: `Thanks, ${esc(firstName(r.name))}.<br>We're on it.`,
    intro: `Our team is reviewing your request now and will reach out by ${by} with your price and the next available times. Here's a copy of what you sent us.`,
    ref: refCode(r.id),
    body: [
      section(
        "Your request",
        details([
          ["Reference", refCode(r.id)],
          ["Vehicle", f.vehicle],
          ["Services", f.services.join("\n")],
          ["Where", f.where],
          ["When", r.timing],
          ["Notes", r.notes],
          ["Photos", Array.isArray(r.photo_paths) && r.photo_paths.length ? `${r.photo_paths.length} received` : ""],
        ]),
      ),
      section(
        "What happens next",
        f.isFleet ? steps(FLEET_STEPS) : steps([
          { t: "We review your request", d: "A real person on our team looks at your vehicle details, photos and notes." },
          {
            t: f.isRv ? "Your price, or a free assessment" : "You get your price",
            d: f.isRv
              ? "For most RVs we can price from the details you sent. For heavier oxidation we book a free assessment first."
              : "We confirm the work and the price with you before anything is booked.",
          },
          { t: "Pick a time", d: "Mobile at your home, office or storage lot, or drop-off at our heated Airdrie shop." },
          { t: "The Walkaround", d: "When the job is done, you walk around it with us and sign off. Anything not right is fixed on the spot." },
        ]),
      ),
      section("Good to know", bullets(GOOD_TO_KNOW)),
    ].join(""),
  });
  return { subject: "We've got your quote request | Xpress Auto & RV Detailing", html };
}

/* ---------- contact_submissions ---------- */

export function contactKind(form_type: unknown) {
  const t = String(form_type ?? "");
  if (t === "training") return "training" as const;
  if (t === "fleet") return "fleet" as const;
  if (t.startsWith("quote")) return "quote" as const;
  return "general" as const;
}

const KIND_LABEL = {
  training: "Training request",
  fleet: "Fleet inquiry",
  quote: "Quote request (backup form)",
  general: "Website message",
};

export function contactStaff(rec: Rec) {
  const kind = contactKind(rec.form_type);
  const subject = `${KIND_LABEL[kind]}: ${rec.name ?? "Unknown"}${rec.company_name ? ` · ${rec.company_name}` : ""}`;
  const html = staffEmail({
    preheader: `${rec.name ?? ""} · ${String(rec.message ?? "").slice(0, 90)}`,
    eyebrow: `New ${KIND_LABEL[kind].toLowerCase()}`,
    title: esc(rec.company_name || rec.name || "Website message"),
    intro: kind === "quote" ? "The main quote table didn't accept this one, so it came through the backup form. Details are in the message." : undefined,
    body: [
      staffActions(rec.phone, rec.email, `Hi ${firstName(rec.name)}, it's ${BRAND.name} following up on your request.`),
      section(
        "Contact",
        details([
          ["Name", rec.name],
          ["Phone", rec.phone],
          ["Email", /@xpressautodetail\.ca$/i.test(String(rec.email ?? "")) ? "Not provided" : rec.email],
          ["Company", rec.company_name],
          ["Form", rec.form_type],
        ]),
      ),
      section("Message", quoteBlock(rec.message)),
    ].join(""),
    meta: `Submitted ${esc(stamp(rec.created_at))}`,
  });
  return { subject, html };
}

export function contactCustomer(rec: Rec) {
  const kind = contactKind(rec.form_type);
  const name = esc(firstName(rec.name));

  const copy = {
    training: {
      subject: "Your training request is in | Xpress Auto & RV Detailing",
      eyebrow: "Training request received",
      title: `Thanks, ${name}.<br>Your seat request is in.`,
      intro: "Every course is taught one-on-one and hands-on, so we schedule it around you. We'll reach out to set your date.",
      steps: [
        { t: "We call to set your date", d: "Courses run on demand, so we pick a day that works for both of us and answer any questions." },
        { t: "Train one-on-one", d: "You work on real vehicles with the same tools, products and process our crews use every day." },
        { t: "Get certified", d: "Graduates receive the Xpress Auto & RV Detailing certification." },
      ],
      know: [
        { t: "One-on-one.", d: "One student, one instructor, so the whole day is built around your questions." },
        { t: "Location.", d: "We confirm where your course runs when we set your date." },
        { t: "Changes.", d: "Need a different date? Reply to this email or call us any time before your course." },
      ],
    },
    fleet: {
      subject: "Your fleet inquiry is in | Xpress Auto & RV Detailing",
      eyebrow: "Fleet inquiry received",
      title: `Thanks, ${name}.<br>Let's look at your fleet.`,
      intro: "Our team will reach out to learn about your units and book a yard walk, so your rate is based on what we actually see.",
      steps: FLEET_STEPS,
      know: [
        { t: "Self-sufficient on site.", d: "Our vans bring their own water and power to your yard or lot." },
        { t: "Covered.", d: "$2M liability coverage on every job." },
        { t: "Helpful to send.", d: "Reply with your unit count, vehicle types and yard address and we'll come prepared." },
      ],
    },
    quote: {
      subject: "We've got your quote request | Xpress Auto & RV Detailing",
      eyebrow: "Quote request received",
      title: `Thanks, ${name}.<br>We're on it.`,
      intro: "Our team is reviewing your request now and will reach out with your price and the next available times.",
      steps: [
        { t: "We review your request", d: "A real person on our team looks at your vehicle details and notes." },
        { t: "You get your price", d: "We confirm the work and the price with you before anything is booked." },
        { t: "Pick a time", d: "Mobile at your home, office or storage lot, or drop-off at our heated Airdrie shop." },
      ],
      know: GOOD_TO_KNOW,
    },
    general: {
      subject: "Thanks for reaching out | Xpress Auto & RV Detailing",
      eyebrow: "Message received",
      title: `Thanks, ${name}.<br>We got your message.`,
      intro: "A member of our team will read it and get back to you shortly. Here's a copy for your records.",
      steps: [
        { t: "We read your message", d: "A real person on our team reads every message." },
        { t: "We reply", d: "You'll hear back with an answer, a price or the next available times." },
        { t: "Book when ready", d: "Mobile at your home, office or storage lot, or drop-off at our heated Airdrie shop." },
      ],
      know: GOOD_TO_KNOW,
    },
  }[kind];

  const html = customerEmail({
    preheader: `${copy.eyebrow}. Here's what happens next.`,
    eyebrow: copy.eyebrow,
    title: copy.title,
    intro: copy.intro,
    body: [
      section(kind === "training" ? "Your request" : "Your message", quoteBlock(rec.message)),
      section("What happens next", steps(copy.steps)),
      section("Good to know", bullets(copy.know)),
      kind === "general" || kind === "quote"
        ? `<tr><td class="px" style="padding:4px 36px 0">${p(`Already know what you want? <a href="${BRAND.booking}" style="color:#0068AD;font-weight:700">Book online</a> and pick a time.`, "font-size:14px")}</td></tr>`
        : "",
    ].join(""),
  });
  return { subject: copy.subject, html };
}
