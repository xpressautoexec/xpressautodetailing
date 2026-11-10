import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Camera, Check, MessageSquareText, X } from "lucide-react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { trackEvent, trackQuoteSubmit } from "@/lib/tracking";
import { getAttribution } from "@/lib/attribution";
import { BOOKING_URL } from "@/data/pricing";
import { NAP } from "@/data/copy";
import { SMS_HREF } from "@/components/site/QuoteLink";
import WalkaroundGuarantee from "@/components/site/WalkaroundGuarantee";

/** Values are stored as-is and checked by the database policy; keep the two lists in sync. */
export const QUOTE_VEHICLES = ["Car/SUV", "Truck", "RV/Trailer", "Boat", "Fleet"] as const;
export const QUOTE_NEEDS = ["Interior", "Full detail", "Paint correction/ceramic", "PPF/windshield film", "Not sure"] as const;
export type QuoteVehicle = (typeof QUOTE_VEHICLES)[number];
export type QuoteNeed = (typeof QUOTE_NEEDS)[number];

const MAX_PHOTOS = 6;
const MAX_EDGE = 1800;
const MAX_RAW_BYTES = 15 * 1024 * 1024;

/* The generated Supabase types predate quote_requests; this is the row the form inserts. */
type QuoteInsert = {
  id: string;
  vehicle_type: QuoteVehicle;
  need: QuoteNeed;
  name: string;
  phone: string;
  area: string | null;
  location_pref: "mobile" | "shop";
  company_name: string | null;
  fleet_size: string | null;
  photo_paths: string[];
  source: string;
  page_path: string;
  landing_page?: string;
  referrer?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};
const db = supabase as unknown as SupabaseClient;

const uuid = () => {
  try {
    return crypto.randomUUID();
  } catch {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
  }
};

/** Phone photos are 3-12 MB; resize to ~1800px JPEG (about 0.4 MB) before upload. */
const shrink = async (file: File): Promise<{ blob: Blob; ext: string; type: string }> => {
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, MAX_EDGE / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/jpeg", 0.82));
    if (blob) return { blob, ext: "jpg", type: "image/jpeg" };
  } catch {
    /* e.g. HEIC outside Safari: send the original */
  }
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().slice(0, 5);
  return { blob: file, ext, type: file.type || "image/jpeg" };
};

const chip =
  "flex min-h-[52px] cursor-pointer items-center justify-center rounded-md border px-3 text-center text-[15px] font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-electric/40";
const chipOn = "border-electric bg-electric-soft text-electric";
const chipOff = "border-line bg-surface text-ink hover:border-ink-2";
const input =
  "mt-1.5 h-12 w-full rounded-md border border-line bg-surface px-3 text-base text-ink outline-none transition-colors focus:border-electric focus:ring-2 focus:ring-electric/20";

type Props = {
  /** Stored with the lead: which form/page it came from. */
  source?: string;
  title?: string;
  defaultVehicle?: QuoteVehicle;
  defaultNeed?: QuoteNeed;
  /** Pre-select the Airdrie shop (e.g. on PPF pages). */
  defaultLocation?: "mobile" | "shop";
};

/**
 * Two-step quote request. Step 1: what it is and what it needs. Step 2: contact, area,
 * mobile or shop, and up to 6 photos. Saved to quote_requests (photos in the private
 * quote-photos bucket); a database trigger emails the lead to support@.
 */
const QuoteForm = ({ source = "quote", title = "Get a price", defaultVehicle, defaultNeed, defaultLocation = "mobile" }: Props) => {
  const { toast } = useToast();
  const uid = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [vehicle, setVehicle] = useState<QuoteVehicle | undefined>(defaultVehicle);
  const [need, setNeed] = useState<QuoteNeed | undefined>(defaultNeed);
  const [form, setForm] = useState({ name: "", phone: "", area: "", company: "", fleetSize: "" });
  const [location, setLocation] = useState<"mobile" | "shop">(defaultLocation);
  const [photos, setPhotos] = useState<{ file: File; url: string }[]>([]);
  const [sending, setSending] = useState<string | null>(null);
  const [sentPhotos, setSentPhotos] = useState(0);

  const photosRef = useRef(photos);
  photosRef.current = photos;
  useEffect(() => () => photosRef.current.forEach((p) => URL.revokeObjectURL(p.url)), []);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const goTo = (s: 1 | 2 | 3) => {
    setStep(s);
    // Keep the form in view on phones when the step changes.
    requestAnimationFrame(() => {
      const el = topRef.current;
      if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const next = () => {
    if (!vehicle || !need) {
      toast({ title: "Pick what it is and what it needs.", variant: "destructive" });
      return;
    }
    trackEvent("quote_step1_complete", { vehicle_type: vehicle, need, form_source: source });
    goTo(2);
  };

  const addPhotos = (list: FileList | null) => {
    if (!list) return;
    const room = MAX_PHOTOS - photos.length;
    const picked = Array.from(list)
      .filter((f) => f.type.startsWith("image/") || /\.(heic|heif)$/i.test(f.name))
      .filter((f) => f.size <= MAX_RAW_BYTES);
    if (picked.length > room) toast({ title: `Up to ${MAX_PHOTOS} photos. We kept the first ${room}.` });
    setPhotos((p) => [...p, ...picked.slice(0, room).map((file) => ({ file, url: URL.createObjectURL(file) }))]);
    if (fileRef.current) fileRef.current.value = "";
  };

  const removePhoto = (i: number) =>
    setPhotos((p) => {
      URL.revokeObjectURL(p[i].url);
      return p.filter((_, j) => j !== i);
    });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicle || !need) return goTo(1);
    const phoneDigits = form.phone.replace(/\D/g, "");
    if (!form.name.trim()) {
      toast({ title: "Add your name.", variant: "destructive" });
      return;
    }
    if (phoneDigits.length < 10) {
      toast({ title: "Add a 10-digit mobile number so we can text you the price.", variant: "destructive" });
      return;
    }

    const leadId = uuid();
    const paths: string[] = [];
    try {
      for (let i = 0; i < photos.length; i++) {
        setSending(`Uploading photo ${i + 1} of ${photos.length}…`);
        const { blob, ext, type } = await shrink(photos[i].file);
        const path = `${leadId}/${i + 1}.${ext}`;
        const { error } = await supabase.storage.from("quote-photos").upload(path, blob, { contentType: type, upsert: false });
        if (!error) paths.push(path);
        else console.error("Photo upload failed", error);
      }

      setSending("Sending…");
      const attr = getAttribution();
      const row: QuoteInsert = {
        id: leadId,
        vehicle_type: vehicle,
        need,
        name: form.name.trim().slice(0, 120),
        phone: form.phone.trim().slice(0, 30),
        area: form.area.trim().slice(0, 120) || null,
        location_pref: location,
        company_name: vehicle === "Fleet" ? form.company.trim().slice(0, 200) || null : null,
        fleet_size: vehicle === "Fleet" ? form.fleetSize.trim().slice(0, 60) || null : null,
        photo_paths: paths,
        source: source.slice(0, 80),
        page_path: window.location.pathname.slice(0, 300),
        ...attr,
      };
      const { error } = await db.from("quote_requests").insert(row);
      if (error) {
        // Never lose a lead: fall back to the older contact table (emailed by its own trigger).
        console.error("quote_requests insert failed, using fallback", error);
        const lines = [
          `Quote request: ${vehicle} / ${need}`,
          row.area && `Area: ${row.area}`,
          `Prefers: ${location === "shop" ? "Airdrie shop" : "mobile"}`,
          row.company_name && `Company: ${row.company_name}`,
          row.fleet_size && `Fleet size: ${row.fleet_size}`,
          paths.length ? `Photos uploaded: ${paths.length} (lead ${leadId})` : "No photos uploaded",
          attr.gclid && `gclid: ${attr.gclid}`,
          attr.utm_source && `utm: ${[attr.utm_source, attr.utm_medium, attr.utm_campaign].filter(Boolean).join(" / ")}`,
          `Page: ${row.page_path}`,
        ].filter(Boolean);
        const fb = await supabase.from("contact_submissions").insert({
          name: row.name,
          email: "not-provided@xpressautodetail.ca",
          phone: row.phone,
          message: lines.join("\n"),
          form_type: `quote:${row.source}`.slice(0, 100),
        });
        if (fb.error) throw fb.error;
      }

      trackQuoteSubmit({ leadId, phone: form.phone, vehicle, need, photos: paths.length, source });
      setSentPhotos(paths.length);
      if (photos.length && paths.length < photos.length) {
        toast({ title: "Some photos didn't upload. Text them to us and we'll add them to your quote." });
      }
      goTo(3);
    } catch (err) {
      console.error("Quote submit failed", err);
      toast({ title: `That didn't send. Please call or text ${NAP.phone}.`, variant: "destructive" });
    } finally {
      setSending(null);
    }
  };

  if (step === 3) {
    return (
      <div ref={topRef} data-quote-form className="scroll-mt-24 rounded-card border border-line bg-surface p-6 sm:p-8" role="status">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-electric text-primary-foreground">
          <Check className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="mt-5 font-heading text-3xl font-bold leading-tight text-ink">
          Got it — we'll text you a price, usually within 15 minutes during the day.
        </p>
        {sentPhotos === 0 ? (
          <>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
              Send three photos (front, side and the worst spot) and the price will be exact, not a range.
            </p>
            <a
              href={SMS_HREF}
              className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-md bg-electric px-6 text-[15px] font-semibold text-primary-foreground hover:bg-electric-2 sm:w-auto"
            >
              <MessageSquareText className="h-4 w-4" aria-hidden="true" />
              Text photos to {NAP.phone}
            </a>
          </>
        ) : (
          <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
            We have your {sentPhotos} photo{sentPhotos > 1 ? "s" : ""}. Keep your phone handy; the price comes by text from {NAP.phone}.
          </p>
        )}
        <WalkaroundGuarantee className="mt-8" />
        <div className="mt-6 border-t border-line pt-5">
          <p className="text-sm text-muted-ink">Already know what you want?</p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex min-h-[44px] items-center justify-center rounded-md border border-ink/20 px-5 text-sm font-semibold text-ink transition-colors hover:border-ink"
          >
            Book online
          </a>
        </div>
      </div>
    );
  }

  return (
    <div ref={topRef} data-quote-form className="scroll-mt-24 rounded-card border border-line bg-surface p-5 sm:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-heading text-2xl font-bold text-ink sm:text-3xl">{title}</p>
        <p className="shrink-0 text-xs font-semibold uppercase tracking-label text-muted-ink">Step {step} of 2</p>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-1.5" aria-hidden="true">
        <span className="h-1 rounded-full bg-electric" />
        <span className={`h-1 rounded-full ${step === 2 ? "bg-electric" : "bg-line"}`} />
      </div>

      {step === 1 ? (
        <div className="mt-6">
          <fieldset>
            <legend className="text-[15px] font-semibold text-ink">What is it?</legend>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {QUOTE_VEHICLES.map((v) => (
                <label key={v} className={`${chip} ${vehicle === v ? chipOn : chipOff}`}>
                  <input type="radio" name={`${uid}-vehicle`} value={v} checked={vehicle === v} onChange={() => setVehicle(v)} className="sr-only" />
                  {v}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset className="mt-7">
            <legend className="text-[15px] font-semibold text-ink">What does it need?</legend>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {QUOTE_NEEDS.map((n) => (
                <label key={n} className={`${chip} ${need === n ? chipOn : chipOff}`}>
                  <input type="radio" name={`${uid}-need`} value={n} checked={need === n} onChange={() => setNeed(n)} className="sr-only" />
                  {n}
                </label>
              ))}
            </div>
          </fieldset>
          <button
            type="button"
            onClick={next}
            className="mt-8 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-md bg-electric px-6 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-electric-2"
          >
            Next
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <p className="mt-4 text-center text-sm text-muted-ink">
            Rather just text?{" "}
            <a href={SMS_HREF} className="font-semibold text-electric hover:underline hover:underline-offset-4">
              Send photos to {NAP.phone}
            </a>
          </p>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-6" noValidate>
          <p className="flex flex-wrap items-center gap-x-2 text-sm text-ink-2">
            <span className="font-semibold text-ink">
              {vehicle} · {need}
            </span>
            <button type="button" onClick={() => goTo(1)} className="inline-flex items-center gap-1 font-semibold text-electric hover:underline">
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Change
            </button>
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-ink-2">
              Name
              <input required maxLength={120} autoComplete="name" value={form.name} onChange={set("name")} className={input} />
            </label>
            <label className="block text-sm font-medium text-ink-2">
              Mobile number
              <input
                required
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                maxLength={30}
                placeholder="587-555-0123"
                value={form.phone}
                onChange={set("phone")}
                className={input}
              />
            </label>
            <label className="block text-sm font-medium text-ink-2 sm:col-span-2">
              Postal code or area <span className="text-muted-ink">(optional)</span>
              <input maxLength={120} autoComplete="postal-code" placeholder="T3A 1B2 or Airdrie" value={form.area} onChange={set("area")} className={input} />
            </label>
            {vehicle === "Fleet" && (
              <>
                <label className="block text-sm font-medium text-ink-2">
                  Company <span className="text-muted-ink">(optional)</span>
                  <input maxLength={200} autoComplete="organization" value={form.company} onChange={set("company")} className={input} />
                </label>
                <label className="block text-sm font-medium text-ink-2">
                  How many vehicles? <span className="text-muted-ink">(optional)</span>
                  <input maxLength={60} inputMode="numeric" value={form.fleetSize} onChange={set("fleetSize")} className={input} />
                </label>
              </>
            )}
          </div>

          <fieldset className="mt-5">
            <legend className="text-sm font-medium text-ink-2">Where works best?</legend>
            <div className="mt-1.5 grid grid-cols-2 gap-2">
              {(
                [
                  ["mobile", "Mobile", "We come to you"],
                  ["shop", "Airdrie shop", "Heated, drop-off"],
                ] as const
              ).map(([v, label, sub]) => (
                <label key={v} className={`${chip} flex-col gap-0 py-2 ${location === v ? chipOn : chipOff}`}>
                  <input type="radio" name={`${uid}-loc`} value={v} checked={location === v} onChange={() => setLocation(v)} className="sr-only" />
                  <span>{label}</span>
                  <span className={`text-xs font-normal ${location === v ? "text-electric" : "text-muted-ink"}`}>{sub}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-6">
            <p className="text-sm font-medium text-ink-2">
              Photos <span className="text-muted-ink">(up to {MAX_PHOTOS})</span>
            </p>
            <p className="mt-0.5 text-sm font-semibold text-electric">Photos = faster, exact price</p>
            <input
              ref={fileRef}
              id={`${uid}-photos`}
              type="file"
              accept="image/*,.heic,.heif"
              multiple
              onChange={(e) => addPhotos(e.target.files)}
              className="sr-only"
            />
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
              {photos.map((p, i) => (
                <div key={p.url} className="relative aspect-square overflow-hidden rounded-md border border-line bg-tint">
                  <img src={p.url} alt={`Photo ${i + 1}`} className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removePhoto(i)}
                    aria-label={`Remove photo ${i + 1}`}
                    className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-charcoal/80 text-primary-foreground"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              ))}
              {photos.length < MAX_PHOTOS && (
                <label
                  htmlFor={`${uid}-photos`}
                  className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-dashed border-ink/25 bg-tint text-xs font-semibold text-ink-2 transition-colors hover:border-electric hover:text-electric"
                >
                  <Camera className="h-5 w-5" aria-hidden="true" />
                  {photos.length ? "Add more" : "Add photos"}
                </label>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={!!sending}
            className="mt-7 inline-flex min-h-[56px] w-full items-center justify-center rounded-md bg-electric px-6 text-base font-semibold text-primary-foreground transition-colors hover:bg-electric-2 disabled:opacity-70"
          >
            {sending ?? "Get my price"}
          </button>
          <p className="mt-3 text-center text-xs text-muted-ink">
            We text you the price from {NAP.phone}. No spam, no obligation.
          </p>
        </form>
      )}
    </div>
  );
};

export default QuoteForm;
