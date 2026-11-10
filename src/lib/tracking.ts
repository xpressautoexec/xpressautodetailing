/**
 * Analytics and conversion tracking. The Google tag (gtag.js, Google Ads) loads in index.html,
 * which also records sms_click / tel_click / fieldd_click for every link on the site.
 *
 * Events:
 *   quote_step1_complete  vehicle + need chosen in the quote form
 *   quote_submit          quote saved to the database: the primary conversion
 *   sms_click, tel_click, fieldd_click  (index.html click listener)
 */

export const GOOGLE_ADS_ID = "AW-17894848842";

/**
 * Google Analytics 4 measurement ID ("G-XXXXXXXXXX"). Admin > Data streams > Web.
 * While null, GA4 is not loaded; Google Ads tracking still runs.
 */
export const GA4_ID: string | null = null;

/** Microsoft Clarity project ID (Clarity > Settings > Overview). While null, Clarity is not loaded. */
export const CLARITY_ID: string | null = null;

/**
 * Conversion label of the Google Ads action "Lead - Website form"
 * (Google Ads > Goals > Conversions > the action > Tag setup > "send_to": "AW-17894848842/<label>").
 * While null, the lead is sent as a generate_lead event only and Google Ads records no conversion.
 */
export const GOOGLE_ADS_LEAD_LABEL: string | null = "OE75CPn5j54dEMry9tRC";

type Gtag = (...args: unknown[]) => void;

const gtag: Gtag = (...args) => {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: Gtag };
  if (typeof w.gtag === "function") w.gtag(...args);
};

const newEventId = () => {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
};

/** E.164 for Canadian numbers, as Google's enhanced conversions expects. */
const normalizePhone = (raw?: string | null) => {
  const digits = (raw ?? "").replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return undefined;
};

export interface LeadDetails {
  formType: string;
  email?: string | null;
  phone?: string | null;
}

/** Loads GA4 and Clarity when their IDs are set. Call once in the browser. */
export const initAnalytics = () => {
  if (typeof window === "undefined") return;
  if (GA4_ID) gtag("config", GA4_ID);
  if (CLARITY_ID && !document.getElementById("clarity-tag")) {
    const w = window as unknown as { clarity?: { (...a: unknown[]): void; q?: unknown[] } };
    w.clarity =
      w.clarity ||
      Object.assign((...a: unknown[]) => {
        (w.clarity!.q = w.clarity!.q || []).push(a);
      }, {});
    const tag = document.createElement("script");
    tag.id = "clarity-tag";
    tag.async = true;
    tag.src = `https://www.clarity.ms/tag/${encodeURIComponent(CLARITY_ID)}`;
    document.head.appendChild(tag);
  }
};

/** Plain analytics event (GA4 when configured; also visible in Google Ads as an event). */
export const trackEvent = (name: string, params: Record<string, unknown> = {}) => {
  gtag("event", name, { page_location: typeof window !== "undefined" ? window.location.pathname : undefined, ...params });
};

/**
 * The primary conversion: a quote request saved to the database.
 * Sends quote_submit plus the Google Ads "Lead - Website form" conversion, with the phone
 * number for enhanced conversions. The lead id is the transaction id, so a retry can't double count.
 */
export const trackQuoteSubmit = ({
  leadId,
  phone,
  vehicle,
  need,
  photos,
  source,
}: {
  leadId: string;
  phone: string;
  vehicle: string;
  need: string;
  photos: number;
  source: string;
}) => {
  const phoneNumber = normalizePhone(phone);
  if (phoneNumber) gtag("set", "user_data", { phone_number: phoneNumber });
  trackEvent("quote_submit", { vehicle_type: vehicle, need, photo_count: photos, form_source: source, event_id: leadId });
  if (GOOGLE_ADS_LEAD_LABEL) {
    gtag("event", "conversion", { send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_LEAD_LABEL}`, transaction_id: leadId });
  }
  const clarity = (window as unknown as { clarity?: (...a: unknown[]) => void }).clarity;
  if (typeof clarity === "function") clarity("event", "quote_submit");
};

/** Call once, after the form submission has been saved successfully. */
export const trackLead = ({ formType, email, phone }: LeadDetails) => {
  const eventId = newEventId();
  const cleanEmail = email && !email.endsWith("@xpressautodetail.ca") ? email.trim().toLowerCase() : undefined;
  const phoneNumber = normalizePhone(phone);
  if (cleanEmail || phoneNumber) {
    gtag("set", "user_data", {
      ...(cleanEmail ? { email: cleanEmail } : {}),
      ...(phoneNumber ? { phone_number: phoneNumber } : {}),
    });
  }
  gtag("event", "generate_lead", { form_type: formType, event_id: eventId });
  if (GOOGLE_ADS_LEAD_LABEL) {
    gtag("event", "conversion", { send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_LEAD_LABEL}`, transaction_id: eventId });
  }
  return eventId;
};
