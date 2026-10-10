/**
 * Conversion tracking helpers. The Google tag itself loads in index.html.
 *
 * Only real outcomes are conversions: a successful form submission (written to Supabase).
 * Clicks on "Book" (Fieldd) and on the phone number are recorded as plain events, never as conversions.
 */

export const GOOGLE_ADS_ID = "AW-17894848842";

/**
 * Conversion label of the Google Ads action "Lead - Website form"
 * (Google Ads > Goals > Conversions > the action > Tag setup > "send_to": "AW-17894848842/<label>").
 * While null, the lead is sent as a generate_lead event only and Google Ads records no conversion.
 */
export const GOOGLE_ADS_LEAD_LABEL: string | null = null;

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
