export type HubBookingMessage =
  | { type: "resize"; height: number }
  | { type: "booked"; bookingNumber: string };

/** Validate untrusted frame messages before any UI or analytics action. */
export const parseHubBookingMessage = (
  event: { origin: string; data: unknown },
  allowedOrigin: string | null,
): HubBookingMessage | null => {
  if (!allowedOrigin || event.origin !== allowedOrigin || !event.data || typeof event.data !== "object") return null;
  const data = event.data as Record<string, unknown>;
  if (data.source !== "xpress-hub") return null;
  if (data.type === "resize" && typeof data.height === "number" && Number.isFinite(data.height) && data.height > 0) {
    return { type: "resize", height: data.height };
  }
  if (data.type === "booked" && typeof data.bookingNumber === "string" && data.bookingNumber.trim()) {
    return { type: "booked", bookingNumber: data.bookingNumber };
  }
  return null;
};
