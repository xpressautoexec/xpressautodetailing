import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Building2, Bus, Camera, Car, CarFront, Caravan, Check, CircleHelp, Gauge, Phone, Ship, Star, Truck, X, type LucideIcon } from "lucide-react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { trackEvent, trackQuoteSubmit } from "@/lib/tracking";
import { getAttribution } from "@/lib/attribution";
import { NAP } from "@/data/copy";
import { FIVE_STAR_REVIEWS } from "@/data/pricing";
import { TEL_HREF } from "@/components/site/QuoteLink";

/* Legacy coarse values, still stored in vehicle_type / need and checked by the database policy. */
export const QUOTE_VEHICLES = ["Car/SUV", "Truck", "RV/Trailer", "Boat", "Fleet"] as const;
export const QUOTE_NEEDS = ["Interior", "Full detail", "Paint correction/ceramic", "PPF/windshield film", "Not sure"] as const;
export type QuoteVehicle = (typeof QUOTE_VEHICLES)[number];
export type QuoteNeed = (typeof QUOTE_NEEDS)[number];

export const VEHICLE_TYPES = [
  "Car / Sedan",
  "SUV",
  "Pickup Truck",
  "Minivan / 3-Row",
  "Exotic / Sports",
  "RV / Motorhome",
  "Travel Trailer / 5th Wheel",
  "Boat",
  "Fleet / Commercial",
  "Other",
] as const;
export type VehicleType = (typeof VEHICLE_TYPES)[number];

const VEHICLE_ICONS: Record<VehicleType, LucideIcon> = {
  "Car / Sedan": Car,
  SUV: CarFront,
  "Pickup Truck": Truck,
  "Minivan / 3-Row": Bus,
  "Exotic / Sports": Gauge,
  "RV / Motorhome": Bus,
  "Travel Trailer / 5th Wheel": Caravan,
  Boat: Ship,
  "Fleet / Commercial": Building2,
  Other: CircleHelp,
};

export const SERVICES = [
  "Interior Detail",
  "Full Detail",
  "Paint Correction (Xpress Correct™)",
  "Ceramic Coating",
  "Paint Protection Film",
  "ExoShield Windshield Film",
  "Headlight Restoration",
  "RV Wash & Seal",
  "RV Oxidation Removal / Restoration (Xpress Restore™)",
  "Fleet Program",
  "Lease Return Prep",
  "Training Course",
  "Not sure — need advice",
] as const;
export type Service = (typeof SERVICES)[number];

const CARS: VehicleType[] = ["Car / Sedan", "SUV", "Pickup Truck", "Minivan / 3-Row", "Exotic / Sports"];
const UNITS: VehicleType[] = ["RV / Motorhome", "Travel Trailer / 5th Wheel", "Boat"];
const isCar = (v?: VehicleType) => !!v && CARS.includes(v);
const isUnit = (v?: VehicleType) => !!v && UNITS.includes(v);
const isRv = (v?: VehicleType) => v === "RV / Motorhome" || v === "Travel Trailer / 5th Wheel";

/** Services shown for each vehicle type. "Not sure" is always kept. */
export const servicesFor = (v?: VehicleType): Service[] => {
  const rv = ["RV Wash & Seal", "RV Oxidation Removal / Restoration (Xpress Restore™)"];
  const carOnly = ["ExoShield Windshield Film", "Headlight Restoration", "Lease Return Prep"];
  if (isRv(v)) return SERVICES.filter((s) => !carOnly.includes(s) && s !== "Fleet Program");
  if (v === "Boat") return SERVICES.filter((s) => ["Interior Detail", "Full Detail", "Paint Correction (Xpress Correct™)", "Ceramic Coating", "Training Course", "Not sure — need advice"].includes(s));
  if (v === "Fleet / Commercial") return [...SERVICES];
  return SERVICES.filter((s) => !rv.includes(s));
};

const LOCATIONS = [
  ["shop", "Drop-off at our Airdrie shop"],
  ["mobile", "Mobile — at my location"],
  ["either", "Either works"],
] as const;
type Loc = (typeof LOCATIONS)[number][0];
const AREAS = ["Calgary", "Airdrie", "Cochrane", "Chestermere", "Okotoks", "Rocky View County", "Other"];
const CONTACT_PREFS = ["Call", "Text", "Email"] as const;
type ContactPref = (typeof CONTACT_PREFS)[number];
const MAKES = ["Acura", "Audi", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge", "Ford", "Genesis", "GMC", "Honda", "Hyundai", "Infiniti", "Jeep", "Kia", "Land Rover", "Lexus", "Lincoln", "Mazda", "Mercedes-Benz", "Mitsubishi", "Nissan", "Porsche", "Ram", "Subaru", "Tesla", "Toyota", "Volkswagen", "Volvo"];

/** Maps from the older page presets so every page keeps its pre-fill. */
const LEGACY_VEHICLE: Record<QuoteVehicle, VehicleType | undefined> = {
  "Car/SUV": undefined,
  Truck: "Pickup Truck",
  "RV/Trailer": "RV / Motorhome",
  Boat: "Boat",
  Fleet: "Fleet / Commercial",
};
const LEGACY_NEED: Record<QuoteNeed, Service> = {
  Interior: "Interior Detail",
  "Full detail": "Full Detail",
  "Paint correction/ceramic": "Ceramic Coating",
  "PPF/windshield film": "Paint Protection Film",
  "Not sure": "Not sure — need advice",
};

export const toLegacyVehicle = (v: VehicleType): QuoteVehicle =>
  v === "Pickup Truck" ? "Truck" : isRv(v) ? "RV/Trailer" : v === "Boat" ? "Boat" : v === "Fleet / Commercial" ? "Fleet" : "Car/SUV";
export const toLegacyNeed = (s: Service[]): QuoteNeed => {
  const has = (...k: string[]) => s.some((x) => k.some((y) => x.startsWith(y)));
  if (has("Paint Protection", "ExoShield")) return "PPF/windshield film";
  if (has("Paint Correction", "Ceramic", "RV Oxidation")) return "Paint correction/ceramic";
  if (has("Full Detail", "RV Wash", "Lease Return", "Fleet")) return "Full detail";
  if (has("Interior")) return "Interior";
  return "Not sure";
};

export const formatPhone = (raw: string) => {
  const d = raw.replace(/\D/g, "").replace(/^1(?=\d{10})/, "").slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
};

const MAX_PHOTOS = 6;
const MAX_EDGE = 1800;
const MAX_RAW_BYTES = 15 * 1024 * 1024;
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
  "flex min-h-[44px] cursor-pointer items-center justify-center rounded-full border px-3.5 py-2 text-center text-[14px] font-semibold sm:min-h-[48px] sm:px-4 sm:text-[15px] leading-tight transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-electric/40";
const chipOn = "border-action bg-action text-primary-foreground shadow-sm";
const chipOff = "border-line bg-surface text-ink hover:border-ink-2";
const input =
  "mt-1.5 h-12 w-full rounded-lg border border-line bg-surface px-3 text-base text-ink outline-none transition-colors focus:border-electric focus:ring-2 focus:ring-electric/20";
const labelCls = "block text-sm font-semibold text-ink";
const opt = <span className="font-normal text-muted-ink">(optional)</span>;
const btnMain =
  "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-electric px-7 text-base font-semibold text-primary-foreground transition-colors hover:bg-electric-2 disabled:opacity-70";
const btnBack =
  "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-line px-6 text-base font-semibold text-ink transition-colors hover:border-ink";

const Err = ({ msg }: { msg?: string }) => (msg ? <p className="mt-1.5 text-sm font-medium text-destructive" role="alert">{msg}</p> : null);

type Props = {
  /** Stored with the lead: which form/page it came from. */
  source?: string;
  title?: string;
  defaultVehicle?: QuoteVehicle;
  defaultNeed?: QuoteNeed;
  /** Exact vehicle type / services to pre-select (take priority over the legacy presets). */
  defaultVehicleType?: VehicleType;
  defaultServices?: Service[];
  defaultLocation?: Loc;
  submitLabel?: string;
  /** Override the confirmation headline. */
  confirmation?: string;
};

const SHORT_STEPS = ["Vehicle & service", "Contact"];
const STEPS = ["Your vehicle and service", "How to reach you"];

/**
 * The one lead form used everywhere. Two steps, saved to quote_requests (photos in the
 * private quote-photos bucket); a database trigger emails the lead to support@.
 */
const QuoteForm = ({
  source = "quote",
  title = "Get a quote",
  defaultVehicle,
  defaultNeed,
  defaultVehicleType,
  defaultServices,
  defaultLocation,
  submitLabel = "Get my quote",
  confirmation,
}: Props) => {
  const { toast } = useToast();
  const uid = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [vehicle, setVehicle] = useState<VehicleType | undefined>(defaultVehicleType ?? (defaultVehicle ? LEGACY_VEHICLE[defaultVehicle] : undefined));
  const [services, setServices] = useState<Service[]>(defaultServices ?? (defaultNeed ? [LEGACY_NEED[defaultNeed]] : []));
  const [v, setV] = useState({ year: "", make: "", model: "", color: "", length: "", company: "", fleetSize: "", yard: "" });
  const [location, setLocation] = useState<Loc | undefined>(defaultLocation);
  const [area, setArea] = useState("");
  const timing = "";
  const [notes, setNotes] = useState("");
  const [c, setC] = useState({ name: "", phone: "", email: "", heard: "" });
  const pref: ContactPref = "Call";
  const [photos, setPhotos] = useState<{ file: File; url: string }[]>([]);
  const [sending, setSending] = useState<string | null>(null);

  const photosRef = useRef(photos);
  photosRef.current = photos;
  useEffect(() => () => photosRef.current.forEach((p) => URL.revokeObjectURL(p.url)), []);

  const visible = servicesFor(vehicle);
  const chosen = services.filter((s) => visible.includes(s));

  const pickVehicle = (t: VehicleType) => {
    setVehicle(t);
    setErrors((e) => ({ ...e, vehicle: "" }));
  };
  const toggleService = (s: Service) => {
    setServices((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));
    setErrors((e) => ({ ...e, services: "" }));
  };
  const setVf = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement>) => setV((f) => ({ ...f, [k]: e.target.value }));
  const setCf = (k: keyof typeof c) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setC((f) => ({ ...f, [k]: k === "phone" ? formatPhone(e.target.value) : e.target.value }));

  const goTo = (s: 1 | 2 | 3) => {
    setStep(s);
    requestAnimationFrame(() => {
      const el = topRef.current;
      if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const validate = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 1) {
      if (!vehicle) e.vehicle = "Choose the type of vehicle.";
      if (isCar(vehicle)) {
        if (!v.make.trim()) e.make = "Add the make, for example Toyota.";
        if (!v.model.trim()) e.model = "Add the model, for example RAV4.";
      }
      if (isUnit(vehicle) && !/^\d{1,3}(\.\d)?$/.test(v.length.trim())) e.length = "Add the approximate length in feet, for example 32.";
      if (!chosen.length) e.services = "Pick at least one service. Not sure is fine too.";
      if (!location) e.location = "Choose where you'd like the work done.";
      if ((location === "mobile" || location === "either") && !area) e.area = "Choose your city or area.";
    }
    if (s === 2) {
      if (!c.name.trim()) e.name = "Add your name.";
      if (c.phone.replace(/\D/g, "").length !== 10) e.phone = "Add a 10-digit phone number.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c.email.trim())) e.email = "Add a valid email address.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate(step)) return;
    trackEvent(`quote_step${step}_complete`, { vehicle_type: vehicle, form_source: source });
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

  const vehicleLine = () => {
    if (!vehicle) return "";
    const ymm = [v.year.trim(), v.make.trim(), v.model.trim()].filter(Boolean).join(" ");
    const len = isUnit(vehicle) && v.length.trim() ? `, ${v.length.trim()} ft` : "";
    const co = vehicle === "Fleet / Commercial" && v.company.trim() ? `${v.company.trim()}${v.fleetSize.trim() ? ` (${v.fleetSize.trim()} vehicles)` : ""}` : "";
    return [ymm || co, `${vehicle}${len}`].filter(Boolean).join(" — ");
  };
  const locLine = () => {
    const l = LOCATIONS.find(([k]) => k === location)?.[1] ?? "";
    return location !== "shop" && area ? `${l} · ${area}` : l;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(2)) return;
    if (!vehicle) return goTo(1);
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
      const attr = getAttribution() as Record<string, string | undefined>;
      const need = toLegacyNeed(chosen);
      const t = (s: string, n: number) => s.trim().slice(0, n) || null;
      const row = {
        id: leadId,
        vehicle_type: toLegacyVehicle(vehicle),
        need,
        vehicle_category: vehicle,
        vehicle_year: t(v.year, 10),
        vehicle_make: t(v.make, 80),
        vehicle_model: t(v.model, 80),
        vehicle_color: t(v.color, 60),
        length_ft: isUnit(vehicle) ? t(v.length, 20) : null,
        company_name: vehicle === "Fleet / Commercial" ? t(v.company, 200) : null,
        fleet_size: vehicle === "Fleet / Commercial" ? t(v.fleetSize, 60) : null,
        services: chosen,
        location_pref: location ?? null,
        area: location === "shop" ? null : area || null,
        timing: timing || null,
        notes: t([vehicle === "Fleet / Commercial" && v.yard.trim() ? `Yard address: ${v.yard.trim().slice(0, 200)}` : "", notes.trim()].filter(Boolean).join("\n\n"), 2000),
        name: c.name.trim().slice(0, 120),
        phone: c.phone.trim().slice(0, 30),
        email: c.email.trim().slice(0, 255),
        contact_pref: pref,
        heard_from: c.heard || null,
        photo_paths: paths,
        source: source.slice(0, 80),
        page_path: window.location.pathname.slice(0, 300),
        page_url: window.location.href.slice(0, 500),
        ...attr,
      };
      const { error } = await db.from("quote_requests").insert(row);
      if (error) {
        // Never lose a lead: fall back to the older contact table (emailed by its own trigger).
        console.error("quote_requests insert failed, using fallback", error);
        const lines = [
          `Vehicle: ${vehicleLine()}`,
          `Services: ${chosen.join(", ")}`,
          `Where: ${locLine()}`,
          timing && `When: ${timing}`,
          vehicle === "Fleet / Commercial" && v.yard.trim() && `Yard address: ${v.yard.trim()}`,
          notes.trim() && `Notes: ${notes.trim()}`,
          `Contact by: ${pref}`,
          c.heard && `Heard from: ${c.heard}`,
          paths.length ? `Photos uploaded: ${paths.length} (lead ${leadId})` : "",
          attr.gclid && `gclid: ${attr.gclid}`,
          attr.fbclid && `fbclid: ${attr.fbclid}`,
          attr.utm_source && `utm: ${[attr.utm_source, attr.utm_medium, attr.utm_campaign].filter(Boolean).join(" / ")}`,
          `Page: ${row.page_url}`,
        ].filter(Boolean);
        const fb = await supabase.from("contact_submissions").insert({
          name: row.name,
          email: row.email,
          phone: row.phone,
          message: lines.join("\n").slice(0, 5000),
          form_type: `quote:${row.source}`.slice(0, 100),
        });
        if (fb.error) throw fb.error;
      }
      trackQuoteSubmit({ leadId, phone: c.phone, vehicle: row.vehicle_type, need, photos: paths.length, source });
      if (photos.length && paths.length < photos.length) {
        toast({ title: `Some photos didn't upload. Email them to ${NAP.email} and we'll add them to your quote.` });
      }
      goTo(3);
    } catch (err) {
      console.error("Quote submit failed", err);
      toast({ title: `That didn't send. Please call or text ${NAP.phone}.`, variant: "destructive" });
    } finally {
      setSending(null);
    }
  };

  const callLink = (
    <a href={TEL_HREF} className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-ink hover:text-electric">
      <Phone className="h-4 w-4 text-electric" aria-hidden="true" />
      Prefer to talk? Call {NAP.phone}
    </a>
  );

  if (step === 3) {
    const first = c.name.trim().split(/\s+/)[0];
    const by = pref === "Call" ? "phone" : pref === "Text" ? "text" : "email";
    const summary: [string, string][] = [
      ["Vehicle", vehicleLine()],
      ["Services", chosen.join(", ")],
      ["Where", locLine()],
      ["Notes", notes.trim()],
      ["Phone", c.phone],
      ["Email", c.email.trim()],
    ];
    return (
      <div ref={topRef} data-quote-form className="scroll-mt-24 rounded-card border border-line bg-surface p-6 shadow-[0_18px_50px_-24px_hsl(var(--ink)/0.35)] sm:p-8" role="status">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-electric text-primary-foreground">
          <Check className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="mt-5 font-heading text-2xl font-bold leading-tight text-ink sm:text-3xl">
          {confirmation ?? `Thanks, ${first} — we've got your request.`}
        </p>
        <p className="mt-2 text-[15px] text-ink-2">We'll reach out by {by} shortly. A copy of your request is on its way to {c.email.trim()}.</p>
        <dl className="mt-6 divide-y divide-line rounded-lg bg-tint px-4 text-sm">
          {summary.filter(([, val]) => val).map(([k, val]) => (
            <div key={k} className="grid grid-cols-[6rem_1fr] gap-3 py-2.5">
              <dt className="text-muted-ink">{k}</dt>
              <dd className="whitespace-pre-line font-medium text-ink">{val}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6">{callLink}</div>
      </div>
    );
  }

  return (
    <div ref={topRef} data-quote-form className="scroll-mt-24 overflow-hidden rounded-card border border-line bg-surface shadow-[0_18px_50px_-24px_hsl(var(--ink)/0.35)]">
      <div className="bg-charcoal px-5 pb-5 pt-6 sm:px-8">
        <p className="font-heading text-2xl font-bold text-primary-foreground sm:text-3xl">{title}</p>
        <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-primary-foreground/70">
          <span className="inline-flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-current text-electric-soft" aria-hidden="true" />
            {FIVE_STAR_REVIEWS} five-star Google reviews
          </span>
          <span aria-hidden="true">·</span>
          <span>Free, no-obligation quote</span>
        </p>
        <ol className="mt-5 grid grid-cols-2 gap-2" aria-label={`Step ${step} of 2`}>
          {SHORT_STEPS.map((label, i) => {
            const n = i + 1;
            const done = step > n;
            const on = step === n;
            return (
              <li key={label} className="min-w-0">
                <span className={`block h-1.5 rounded-full transition-colors ${step >= n ? "bg-electric" : "bg-primary-foreground/20"}`} />
                <span className={`mt-2 flex items-center gap-1.5 text-xs font-semibold sm:text-[13px] ${on ? "text-primary-foreground" : "text-primary-foreground/55"}`}>
                  <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] ${done || on ? "bg-electric text-primary-foreground" : "border border-primary-foreground/30"}`}>
                    {done ? <Check className="h-3 w-3" aria-hidden="true" /> : n}
                  </span>
                  <span className="truncate">{label}</span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="p-5 sm:p-8">
      <p className="font-heading text-xl font-bold text-ink sm:text-2xl">{STEPS[step - 1]}</p>
      <div className="mt-1">{callLink}</div>

      <form onSubmit={step === 2 ? submit : (e) => (e.preventDefault(), next())} className="mt-4" noValidate>
        {step === 1 && (
          <div className="space-y-6">
            <fieldset>
              <legend className={labelCls}>Vehicle type</legend>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
                {VEHICLE_TYPES.map((t) => {
                  const Icon = VEHICLE_ICONS[t];
                  const on = vehicle === t;
                  return (
                    <label
                      key={t}
                      className={`relative flex min-h-[64px] cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 px-2 py-2.5 sm:min-h-[84px] sm:gap-2 sm:py-3 text-center text-[13px] font-semibold leading-tight transition-all has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-electric/40 ${
                        on ? "border-action bg-electric-soft text-ink" : "border-line bg-surface text-ink hover:border-ink-2/40 hover:bg-tint"
                      }`}
                    >
                      <input type="radio" name={`${uid}-vehicle`} checked={on} onChange={() => pickVehicle(t)} className="sr-only" />
                      {on && (
                        <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-action text-primary-foreground">
                          <Check className="h-3 w-3" aria-hidden="true" />
                        </span>
                      )}
                      <Icon className={`h-6 w-6 sm:h-7 sm:w-7 ${on ? "text-action" : "text-ink-2"}`} strokeWidth={1.6} aria-hidden="true" />
                      {t}
                    </label>
                  );
                })}
              </div>
              <Err msg={errors.vehicle} />
            </fieldset>

            {vehicle && vehicle !== "Fleet / Commercial" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <label className={labelCls}>
                  {isUnit(vehicle) ? "Make / Brand" : "Make"} {!isCar(vehicle) && opt}
                  <input
                    list={isCar(vehicle) ? `${uid}-makes` : undefined}
                    maxLength={80}
                    placeholder={vehicle === "Boat" ? "SunChaser" : isUnit(vehicle) ? "Jayco" : "Toyota"}
                    value={v.make}
                    onChange={setVf("make")}
                    className={input}
                  />
                  <datalist id={`${uid}-makes`}>
                    {MAKES.map((m) => (
                      <option key={m} value={m} />
                    ))}
                  </datalist>
                  <Err msg={errors.make} />
                </label>
                <label className={labelCls}>
                  Model {!isCar(vehicle) && opt}
                  <input maxLength={80} placeholder={isUnit(vehicle) ? "Eagle 321RSTS" : "RAV4"} value={v.model} onChange={setVf("model")} className={input} />
                  <Err msg={errors.model} />
                </label>
              </div>
            )}

            {isUnit(vehicle) && (
              <label className={labelCls}>
                Approximate length in feet
                <span className="block text-sm font-normal text-muted-ink">Measured front to back, without the hitch</span>
                <input inputMode="decimal" maxLength={5} placeholder="32" value={v.length} onChange={setVf("length")} className={`${input} sm:max-w-[10rem]`} />
                <Err msg={errors.length} />
              </label>
            )}

            {vehicle === "Fleet / Commercial" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <label className={labelCls}>
                  Company name {opt}
                  <input maxLength={200} autoComplete="organization" value={v.company} onChange={setVf("company")} className={input} />
                </label>
                <label className={labelCls}>
                  Number of vehicles {opt}
                  <input inputMode="numeric" maxLength={60} placeholder="12" value={v.fleetSize} onChange={setVf("fleetSize")} className={input} />
                </label>
                <label className={`${labelCls} sm:col-span-2`}>
                  Yard or lot address {opt}
                  <input maxLength={200} autoComplete="street-address" placeholder="Where the units are parked" value={v.yard} onChange={setVf("yard")} className={input} />
                </label>
              </div>
            )}

            <fieldset>
              <legend className={labelCls}>Services <span className="font-normal text-muted-ink">(choose any)</span></legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {visible.map((s) => (
                  <label key={s} className={`${chip} ${chosen.includes(s) ? chipOn : chipOff}`}>
                    <input type="checkbox" checked={chosen.includes(s)} onChange={() => toggleService(s)} className="sr-only" />
                    {chosen.includes(s) && <Check className="mr-1.5 h-4 w-4 shrink-0" aria-hidden="true" />}
                    {s}
                  </label>
                ))}
              </div>
              <Err msg={errors.services} />
            </fieldset>

            <fieldset>
              <legend className={labelCls}>Where would you like the work done?</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {LOCATIONS.map(([k, l]) => (
                  <label key={k} className={`${chip} ${location === k ? chipOn : chipOff}`}>
                    <input type="radio" name={`${uid}-loc`} checked={location === k} onChange={() => (setLocation(k), setErrors((e) => ({ ...e, location: "" })))} className="sr-only" />
                    {l}
                  </label>
                ))}
              </div>
              <Err msg={errors.location} />
            </fieldset>

            {(location === "mobile" || location === "either") && (
              <label className={`${labelCls} sm:max-w-xs`}>
                City or area
                <select value={area} onChange={(e) => setArea(e.target.value)} className={input}>
                  <option value="">Choose…</option>
                  {AREAS.map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
                <Err msg={errors.area} />
              </label>
            )}

          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <label className={labelCls}>
              Full name
              <input maxLength={120} autoComplete="name" value={c.name} onChange={setCf("name")} className={input} />
              <Err msg={errors.name} />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelCls}>
                Phone
                <input type="tel" inputMode="tel" autoComplete="tel-national" placeholder="(587) 555-0123" value={c.phone} onChange={setCf("phone")} className={input} />
                <Err msg={errors.phone} />
              </label>
              <label className={labelCls}>
                Email
                <input type="email" autoComplete="email" maxLength={255} placeholder="you@example.com" value={c.email} onChange={setCf("email")} className={input} />
                <Err msg={errors.email} />
              </label>
            </div>
            <label className="block rounded-lg bg-tint p-4">
              <span className={labelCls}>Anything we should know? {opt}</span>
              <textarea
                rows={4}
                maxLength={2000}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Condition of the vehicle, scratches, stains, oxidation, pet hair, questions about pricing or products…"
                className={`${input} h-auto py-2.5`}
              />
            </label>

            <div>
              <p className={labelCls}>Photos {opt}</p>
              <p className="mt-0.5 text-sm text-muted-ink">A few photos help us give an exact price.</p>
              <input ref={fileRef} id={`${uid}-photos`} type="file" accept="image/*,.heic,.heif" multiple onChange={(e) => addPhotos(e.target.files)} className="sr-only" />
              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
                {photos.map((p, i) => (
                  <div key={p.url} className="relative aspect-square overflow-hidden rounded-md border border-line bg-tint">
                    <img src={p.url} alt={`Photo ${i + 1}`} className="h-full w-full object-cover" />
                    <button type="button" onClick={() => removePhoto(i)} aria-label={`Remove photo ${i + 1}`} className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-charcoal/80 text-primary-foreground">
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                ))}
                {photos.length < MAX_PHOTOS && (
                  <label htmlFor={`${uid}-photos`} className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-dashed border-ink/25 bg-tint text-xs font-semibold text-ink-2 hover:border-electric hover:text-electric">
                    <Camera className="h-5 w-5" aria-hidden="true" />
                    {photos.length ? "Add more" : "Add photos"}
                  </label>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex gap-3">
          {step > 1 && (
            <button type="button" onClick={() => goTo(1)} className={btnBack}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back
            </button>
          )}
          <button type="submit" disabled={!!sending} className={`${btnMain} flex-1`}>
            {step === 2 ? sending ?? submitLabel : <>Next <ArrowRight className="h-4 w-4" aria-hidden="true" /></>}
          </button>
        </div>
        {step === 2 && <p className="mt-3 text-center text-xs text-muted-ink">No spam and no obligation. We only use your details to reply to this request, and we'll email you a copy.</p>}
        {step === 2 && <p className="mt-1 text-center text-xs text-muted-ink">By submitting, you agree to our <a href="/privacy-policy" className="font-semibold text-electric hover:underline">Privacy Policy</a>.</p>}
      </form>
      </div>
    </div>
  );
};

export default QuoteForm;
