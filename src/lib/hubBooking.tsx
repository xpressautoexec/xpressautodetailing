import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import HubBookingModal from "@/components/site/HubBookingModal";
import { isHubBookUrl } from "@/data/pricing";
import { trackEvent } from "@/lib/tracking";

const HubBookingContext = createContext<{ open: (url: string) => void }>({ open: () => undefined });

export const HubBookingProvider = ({ children }: { children: ReactNode }) => {
  const [url, setUrl] = useState<string | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const open = useCallback((href: string) => {
    if (!isHubBookUrl(href)) return;
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setUrl(href);
    trackEvent("hub_book_click", { link_url: href });
  }, []);
  return (
    <HubBookingContext.Provider value={{ open }}>
      {children}
      {url && <HubBookingModal key={url} url={url} onClose={() => setUrl(null)} returnFocus={returnFocus.current} />}
    </HubBookingContext.Provider>
  );
};

export const useHubBooking = () => useContext(HubBookingContext);
