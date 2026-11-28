import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { HUB_ORIGIN_NORMALIZED } from "@/data/pricing";
import { parseHubBookingMessage } from "@/lib/hubBookingMessages";
import { trackEvent } from "@/lib/tracking";

const HubBookingModal = ({ url, onClose, returnFocus }: {
  url: string;
  onClose: () => void;
  returnFocus: HTMLElement | null;
}) => {
  const frame = useRef<HTMLIFrameElement>(null);
  const confirmations = useRef(new Set<string>());
  const [loaded, setLoaded] = useState(false);
  const [height, setHeight] = useState(640);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      // Origin and sender both matter: another window on the Hub origin is not this wizard.
      if (event.source !== frame.current?.contentWindow) return;
      const message = parseHubBookingMessage(event, HUB_ORIGIN_NORMALIZED);
      if (!message) return;
      if (message.type === "resize") setHeight(Math.max(640, message.height));
      else if (!confirmations.current.has(message.bookingNumber)) {
        confirmations.current.add(message.bookingNumber);
        trackEvent("hub_booked", { booking_number: message.bookingNumber });
        trackEvent("conversion", {
          send_to: "AW-17894848842/saGECKSR0rEdEMry9tRC",
          transaction_id: message.bookingNumber,
        });
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent
        aria-describedby={undefined}
        onCloseAutoFocus={(event) => { event.preventDefault(); returnFocus?.focus(); }}
        className="main-site left-0 top-0 flex h-[100dvh] max-h-[100dvh] max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-none bg-background p-0 text-foreground sm:left-1/2 sm:top-1/2 sm:h-auto sm:max-h-[90vh] sm:w-[calc(100%-2rem)] sm:max-w-4xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-lg"
      >
        <DialogHeader className="shrink-0 border-b border-border p-5 pr-12">
          <DialogTitle>Book your detail</DialogTitle>
        </DialogHeader>
        <div className="relative min-h-0 flex-1 overflow-auto sm:max-h-[calc(90vh-4rem)]">
          {!loaded && (
            <div role="status" className="absolute inset-x-0 top-0 flex h-40 items-center justify-center gap-2 bg-background text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin motion-reduce:animate-none" aria-hidden="true" />
              Loading booking…
            </div>
          )}
          <iframe
            ref={frame}
            src={url}
            title="Xpress booking"
            allow="payment"
            referrerPolicy="strict-origin-when-cross-origin"
            className="block min-h-[640px] w-full border-0"
            style={{ height }}
            onLoad={() => setLoaded(true)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HubBookingModal;
