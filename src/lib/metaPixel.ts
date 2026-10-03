/**
 * Thin wrapper around the Meta Pixel (fbq) loaded in index.html.
 * Safe to call during SSR/prerender or when the pixel is blocked: it no-ops.
 * Never pass names, emails or phone numbers here.
 */
type FbqParams = Record<string, string | number>;

declare global {
  interface Window {
    fbq?: (command: "track" | "trackCustom", event: string, params?: FbqParams) => void;
  }
}

export const trackMeta = (event: string, params?: FbqParams) => {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", event, params);
};

/** Fired when a quote, assessment or contact form is submitted successfully. */
export const trackLead = (formType: string) =>
  trackMeta("Lead", { content_category: "form", content_name: formType });
