import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import type { SupabaseClient } from "@supabase/supabase-js";
import { ArrowRight, Check, Copy, Phone, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getAttribution } from "@/lib/attribution";
import { trackEvent } from "@/lib/tracking";
import {
  AUTO_PACKAGES,
  CAR_PPF,
  CERAMIC_PACKAGES,
  HEADLIGHT_RESTORATION,
  PHONE,
  RV_BUNDLES,
  WINDSHIELD_PPF,
  carPpfPrice,
  fielddUrl,
  money,
} from "@/data/pricing";

/** Fieldd promo code: 5% off, one use per customer (Fieldd > Discounts > WEB5). */
export const ASSIST_CODE = "WEB5";
const STORE = "xp_assist_v1";
const SNOOZE_DAYS = 7;
const TEL = `tel:+1${PHONE.replace(/-/g, "")}`;

type Vehicle = "sedan" | "suv" | "minivan" | "truck" | "rv";
const VEHICLES: { id: Vehicle; label: string; short: string }[] = [
  { id: "sedan", label: "Car or coupe", short: "car" },
  { id: "suv", label: "SUV / crossover", short: "SUV" },
  { id: "minivan", label: "Minivan / 3-row", short: "minivan" },
  { id: "truck", label: "Pickup truck", short: "truck" },
  { id: "rv", label: "RV or trailer", short: "RV" },
];
const TIMES = ["This week", "Next 2 weeks", "This month", "Just looking"];

type Offer = { name: string; price: string; href: string; need: string };

/** The package each service page leads with, priced for the visitor's vehicle. */
const offerFor = (path: string, v: Vehicle): Offer | null => {
  const size = v === "rv" ? "truck" : v;
  if (path.startsWith("/rv") || v === "rv") {
    const b = RV_BUNDLES.find((x) => x.id === "washseal")!;
    return {
      name: `RV ${b.name}`,
      price: `${money(b.price)}/ft`,
      href: fielddUrl(b.book),
      need: "RV wash & seal",
    };
  }
  if (
    path.startsWith("/detailing") ||
    path.startsWith("/auto-detailing") ||
    path === "/"
  ) {
    const p = AUTO_PACKAGES.find((x) => x.id === "showroom")!;
    return {
      name: p.name,
      price: money(p.price[size]),
      href: fielddUrl(p.book[size]),
      need: "Full detail",
    };
  }
  if (path.startsWith("/ceramic") || path.startsWith("/paint-correction")) {
    const p = CERAMIC_PACKAGES.find((x) => x.id === "signature")!;
    return {
      name: "Coat 3-Year ceramic",
      price: money(p.prices[size]),
      href: fielddUrl(p.book[size]),
      need: "Paint correction/ceramic",
    };
  }
  if (path.startsWith("/paint-protection-film")) {
    const p = CAR_PPF.find((x) => x.id === "full-front")!;
    const s = size === "sedan" ? "car" : size === "truck" ? "truck" : "suv";
    return {
      name: "Full Front PPF",
      price: money(carPpfPrice(p.price, s)),
      href: fielddUrl(p.book[s]),
      need: "PPF/windshield film",
    };
  }
  if (path.startsWith("/windshield-ppf")) {
    const id =
      size === "sedan" ? "compact" : size === "truck" ? "fullsize" : "midsize";
    const t = WINDSHIELD_PPF.find((x) => x.id === id)!;
    return {
      name: "ExoShield GT3+ windshield film",
      price: money(t.price),
      href: fielddUrl(t.book),
      need: "PPF/windshield film",
    };
  }
  if (path.startsWith("/headlight-restoration")) {
    return {
      name: "Headlight restoration",
      price: money(HEADLIGHT_RESTORATION.standalone),
      href: fielddUrl(HEADLIGHT_RESTORATION.book),
      need: "Not sure",
    };
  }
  return null;
};

type Saved = {
  vehicle?: Vehicle;
  timing?: string;
  snoozedAt?: number;
  booked?: boolean;
};
const load = (): Saved => {
  try {
    return JSON.parse(localStorage.getItem(STORE) ?? "{}") as Saved;
  } catch {
    return {};
  }
};
const save = (s: Saved) => {
  try {
    localStorage.setItem(STORE, JSON.stringify(s));
  } catch {
    /* private mode: the assistant still works for this visit */
  }
};

const db = supabase as unknown as SupabaseClient;

/**
 * Two quick questions while someone browses a service page, then the package they're looking at,
 * priced for their vehicle, with 5% off to book now. Optional name + phone saves a lead.
 */
const BookingAssistant = () => {
  const { pathname } = useLocation();
  const [saved, setSaved] = useState<Saved>({});
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [lead, setLead] = useState({ name: "", phone: "" });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => setSaved(load()), []);

  const eligible = useMemo(
    () => offerFor(pathname, "sedan") !== null && pathname !== "/",
    [pathname],
  );
  const snoozed =
    saved.booked ||
    (saved.snoozedAt && Date.now() - saved.snoozedAt < SNOOZE_DAYS * 864e5);

  // Open once the visitor is clearly reading: a third of the page, or 40 seconds.
  useEffect(() => {
    setOpen(false);
    if (!eligible || snoozed) return;
    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      const s = load();
      setStep(s.vehicle ? (s.timing ? 2 : 1) : 0);
      setOpen(true);
      trackEvent("assistant_open", { path: pathname });
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (max > 0 && scrollY / max > 0.33) show();
    };
    const t = setTimeout(show, 40000);
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      removeEventListener("scroll", onScroll);
    };
  }, [pathname, eligible, snoozed]);

  if (!open) return null;

  const update = (s: Saved) => {
    const next = { ...saved, ...s };
    setSaved(next);
    save(next);
  };
  const close = () => {
    update({ snoozedAt: Date.now() });
    setOpen(false);
    trackEvent("assistant_dismiss", { path: pathname, step });
  };
  const vehicleLabel = VEHICLES.find((v) => v.id === saved.vehicle)?.label;
  const offer = saved.vehicle ? offerFor(pathname, saved.vehicle) : null;

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !offer ||
      !lead.name.trim() ||
      lead.phone.replace(/\D/g, "").length < 10
    )
      return;
    const notes = `Booking assistant: ${offer.name} (${offer.price}) · Vehicle: ${vehicleLabel} · Timing: ${saved.timing} · Offered ${ASSIST_CODE} 5% off`;
    const row = {
      vehicle_type:
        saved.vehicle === "rv"
          ? "RV/Trailer"
          : saved.vehicle === "truck"
            ? "Truck"
            : "Car/SUV",
      need: offer.need,
      name: lead.name.trim().slice(0, 120),
      phone: lead.phone.trim().slice(0, 30),
      location_pref: "mobile",
      notes,
      photo_paths: [],
      source: "booking-assistant",
      page_path: pathname.slice(0, 300),
      ...getAttribution(),
    };
    const { error } = await db.from("quote_requests").insert(row);
    if (error) {
      await supabase.from("contact_submissions").insert({
        name: row.name,
        email: "not-provided@xpressautodetail.ca",
        phone: row.phone,
        message: notes,
        form_type: "quote:booking-assistant",
      });
    }
    setSent(true);
    trackEvent("assistant_lead", { path: pathname, offer: offer.name });
  };

  const chip =
    "min-h-[44px] rounded-full border-2 border-line bg-surface px-4 text-sm font-semibold text-ink transition-colors hover:border-ink";

  return (
    <aside
      role="dialog"
      aria-label="Quick booking"
      className="fixed inset-x-3 bottom-[92px] z-50 rounded-card border border-line bg-canvas p-5 shadow-[0_24px_60px_-20px_hsl(var(--ink)/0.45)] sm:inset-x-auto sm:right-5 sm:w-[380px] lg:bottom-5"
    >
      <button
        type="button"
        onClick={close}
        aria-label="Close"
        className="absolute right-3 top-3 rounded-full p-1.5 text-muted-ink hover:bg-tint hover:text-ink"
      >
        <X className="h-4 w-4" />
      </button>

      {step === 0 && (
        <>
          <p className="eyebrow">Quick question 1 of 2</p>
          <p className="mt-1.5 pr-6 font-heading text-xl font-bold text-ink">
            What do you drive?
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {VEHICLES.map((v) => (
              <button
                key={v.id}
                type="button"
                className={chip}
                onClick={() => {
                  update({ vehicle: v.id });
                  setStep(1);
                  trackEvent("assistant_vehicle", { vehicle: v.id });
                }}
              >
                {v.label}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <p className="eyebrow">Quick question 2 of 2</p>
          <p className="mt-1.5 pr-6 font-heading text-xl font-bold text-ink">
            When are you hoping to get it done?
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {TIMES.map((t) => (
              <button
                key={t}
                type="button"
                className={chip}
                onClick={() => {
                  update({ timing: t });
                  setStep(2);
                  trackEvent("assistant_timing", { timing: t });
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 2 && offer && (
        <>
          <p className="eyebrow">You&apos;ve done the hard part</p>
          <p className="mt-1.5 pr-6 font-heading text-xl font-bold leading-tight text-ink">
            {offer.name} for your {VEHICLES.find((v) => v.id === saved.vehicle)?.short}: {offer.price}
          </p>
          <p className="mt-2 text-sm text-ink-2">
            Book now and take 5% off with code{" "}
            <button
              type="button"
              onClick={() => {
                navigator.clipboard
                  ?.writeText(ASSIST_CODE)
                  .catch(() => undefined);
                setCopied(true);
              }}
              className="inline-flex items-center gap-1 rounded bg-electric/10 px-1.5 py-0.5 font-mono font-semibold text-electric"
            >
              {ASSIST_CODE}
              {copied ? (
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              )}
            </button>{" "}
            at checkout.
          </p>
          <a
            href={offer.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              navigator.clipboard
                ?.writeText(ASSIST_CODE)
                .catch(() => undefined);
              update({ booked: true });
              trackEvent("assistant_book", {
                path: pathname,
                offer: offer.name,
              });
            }}
            className="mt-4 inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full bg-action px-5 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-ink"
          >
            Book now and save 5%
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>

          {sent ? (
            <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-ink">
              <Check className="h-4 w-4 text-electric" aria-hidden="true" />
              Got it. We&apos;ll text you to lock in a time.
            </p>
          ) : (
            <form
              onSubmit={submitLead}
              className="mt-4 border-t border-line pt-4"
            >
              <p className="text-xs font-semibold text-ink-2">
                Rather we text you a time? We&apos;ll hold the 5%.
              </p>
              <div className="mt-2 flex gap-2">
                <input
                  required
                  value={lead.name}
                  onChange={(e) =>
                    setLead((l) => ({ ...l, name: e.target.value }))
                  }
                  placeholder="Name"
                  autoComplete="given-name"
                  className="min-h-[44px] w-[40%] rounded-md border border-line bg-surface px-3 text-sm text-ink"
                />
                <input
                  required
                  value={lead.phone}
                  onChange={(e) =>
                    setLead((l) => ({ ...l, phone: e.target.value }))
                  }
                  placeholder="Phone"
                  type="tel"
                  autoComplete="tel"
                  className="min-h-[44px] min-w-0 flex-1 rounded-md border border-line bg-surface px-3 text-sm text-ink"
                />
                <button
                  type="submit"
                  aria-label="Send"
                  className="min-h-[44px] rounded-md bg-ink px-3 text-primary-foreground"
                >
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-muted-ink">
                By submitting, you agree to our <a href="/privacy-policy" className="font-semibold text-electric hover:underline">Privacy Policy</a>.
              </p>
            </form>
          )}
          <a
            href={TEL}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-ink-2 hover:text-ink"
          >
            <Phone className="h-3.5 w-3.5 text-action" aria-hidden="true" />
            Questions? Call {PHONE}
          </a>
        </>
      )}
    </aside>
  );
};

export default BookingAssistant;
