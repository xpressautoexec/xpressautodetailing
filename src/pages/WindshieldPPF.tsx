import { useState, useRef, useCallback } from "react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ServicePageHero from "@/components/ServicePageHero";
import ServiceFAQ from "@/components/ServiceFAQ";
import GuaranteeStrip from "@/components/site/GuaranteeStrip";
import ProcessSteps from "@/components/site/ProcessSteps";
import ClosingCTA from "@/components/site/ClosingCTA";
import { Section, SectionHeading, btnPrimary } from "@/components/site/Section";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import { Check, Phone } from "lucide-react";
import windshieldHero from "@/assets/windshield-ppf-hero.jpg";
import windshieldCracked from "@/assets/windshield-cracked.jpg";
import windshieldProtected from "@/assets/windshield-protected.jpg";
import windshieldSedan from "@/assets/windshield-ppf-sedan.jpg";
import windshieldSuv from "@/assets/windshield-ppf-suv.jpg";
import windshieldTruck from "@/assets/windshield-ppf-truck.jpg";
import windshieldRv from "@/assets/windshield-ppf-rv.jpg";
import { WINDSHIELD_PPF, money } from "@/data/pricing";
import { FILM_BRAND, NAP } from "@/data/copy";

const WINDSHIELD_IMAGES: Record<string, string> = {
  compact: windshieldSedan,
  midsize: windshieldSuv,
  fullsize: windshieldTruck,
  heavy: windshieldRv,
};

/* ---------------- Before / After slider ---------------- */

interface BAProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
}

const WindshieldBeforeAfter = ({ beforeSrc, afterSrc, beforeAlt, afterAlt }: BAProps) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] sm:aspect-video rounded-[10px] overflow-hidden cursor-col-resize select-none border border-line"
      onPointerDown={(e) => {
        isDragging.current = true;
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        updatePosition(e.clientX);
      }}
      onPointerMove={(e) => {
        if (!isDragging.current) return;
        updatePosition(e.clientX);
      }}
      onPointerUp={() => {
        isDragging.current = false;
      }}
      role="slider"
      aria-label="Cracked vs PPF-protected windshield comparison"
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <img src={afterSrc} alt={afterAlt} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <img
          src={beforeSrc}
          alt={beforeAlt}
          className="absolute inset-0 h-full object-cover"
          style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : "100vw", maxWidth: "none" }}
          draggable={false}
        />
      </div>
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-primary-foreground z-10 shadow-[0_0_20px_rgba(255,255,255,0.5)]"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary-foreground shadow-xl flex items-center justify-center ring-4 ring-primary/30">
          <svg width="22" height="22" viewBox="0 0 20 20" fill="none" className="text-brand-dark">
            <path d="M7 4L3 10L7 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 4L17 10L13 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <span className="absolute left-4 top-4 z-20 rounded bg-brand-dark/85 px-3 py-1.5 text-xs font-semibold text-primary-foreground">
        Unprotected
      </span>
      <span className="absolute right-4 top-4 z-20 rounded bg-electric px-3 py-1.5 text-xs font-semibold text-primary-foreground">
        With film
      </span>
    </div>
  );
};

const faqs = [
  {
    q: "How does windshield film protect against rock chips?",
    a: `We install ${FILM_BRAND} windshield film, a 6 to 8 mil optically clear polyurethane layer that absorbs and spreads impact energy before it reaches the glass. Most strikes that would chip or crack bare glass mark the film instead.`,
  },
  {
    q: "Will it affect visibility or the wipers?",
    a: "No. The film is optically clear, self-healing under heat, and works with factory wipers, rain sensors, ADAS cameras and head-up displays. We check sensor and camera function before you drive away.",
  },
  { q: "How long does it last?", a: "Up to 10 years on the glass with normal care." },
  { q: "Can it be removed without damaging the glass?", a: "Yes. It comes off cleanly with no residue or damage to the factory windshield, even years later." },
  {
    q: "Is it worth it compared with replacing the windshield?",
    a: "A windshield replacement in Calgary typically runs $350 to $800 depending on the vehicle and ADAS recalibration. If you drive the highways regularly and keep your vehicle for years, film usually costs less than a single replacement.",
  },
  {
    q: "Does insurance cover it?",
    a: "Most comprehensive policies don't cover film directly, but fewer glass claims helps keep your premium and deductible where they are.",
  },
];

const BENEFITS = [
  { title: "Stops most rock chips", body: "Takes highway debris before it reaches the glass." },
  { title: "Optically clear", body: "Over 99% light transmission. You won't see it once it's on." },
  { title: "Self-healing", body: "Light scratches and wiper marks disappear with sun and warm water." },
  { title: "Built for Alberta", body: "Won't yellow, bubble or peel through Calgary sun and deep cold." },
  { title: "Water beads off", body: "A hydrophobic top layer improves visibility in rain and snow." },
  { title: "Up to 10 years", body: "One install covers years of highway driving." },
];

const STEPS = [
  { title: "Decontaminate", body: "Glass is washed, clay-barred and wiped so nothing is trapped under the film." },
  { title: "Custom pattern", body: "Computer-cut to your make, model and year, including sensor cut-outs." },
  { title: "Install", body: "Film is laid flat with no dust, lint or bubbles." },
  { title: "Cure and check", body: "Edges are sealed and we confirm cameras and sensors work before you go." },
];

const INCLUDED = [
  `${FILM_BRAND} 6–8 mil optically clear film`,
  "Glass decontamination before install",
  "Custom-cut for your windshield",
  "Edge sealing",
  "Rain sensor, ADAS and HUD check",
  "Aftercare guide",
];

const WindshieldPPF = () => {
  const [sizeId, setSizeId] = useState("midsize");
  const selected = WINDSHIELD_PPF.find((v) => v.id === sizeId) ?? WINDSHIELD_PPF[1];
  const from = Math.min(...WINDSHIELD_PPF.map((v) => v.price));

  return (
    <PageTransition>
      <div className="min-h-screen bg-canvas pb-16 lg:pb-0">
        <SEO
          title="Windshield PPF Calgary"
          description={`Windshield protection film in Calgary from ${money(from)}. Stops most rock chips, lasts up to 10 years, ADAS and HUD safe. Priced by vehicle size.`}
          canonical="/protection/windshield-ppf"
          jsonLd={[
            buildServiceJsonLd("Windshield Protection Film", "Optically clear, self-healing windshield protection film installed in Calgary.", "/protection/windshield-ppf"),
            buildFAQJsonLd(faqs),
          ]}
        />
        <Navbar />
        <AutoBreadcrumbs />
        <ServicePageHero
          title="Windshield protection film"
          subtitle={`On Deerfoot, Stoney and the QEII it's not if a rock hits your windshield, it's when. Clear, self-healing film takes the hit instead of the glass, from ${money(from)}.`}
          image={windshieldHero}
          ctaType="call"
        />
        <GuaranteeStrip />

        <Section>
          <SectionHeading title="What film prevents" intro="Drag the slider. Left is what one piece of highway gravel does to bare glass; right is a windshield with film." />
          <WindshieldBeforeAfter
            beforeSrc={windshieldCracked}
            afterSrc={windshieldProtected}
            beforeAlt="Cracked windshield with rock chip damage"
            afterAlt="Clear windshield protected with film, water beading off"
          />
          <dl className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b) => (
              <div key={b.title} className="border-t border-line pt-5">
                <dt className="font-heading text-lg font-semibold text-ink">{b.title}</dt>
                <dd className="mt-1.5 text-[15px] leading-relaxed text-ink-2">{b.body}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section tone="dark" id="pricing">
          <SectionHeading dark title="Pricing by vehicle size" intro="Priced by windshield size. Heated, panoramic and oversized glass may carry a small surcharge, confirmed before install." />
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
            <div className="grid grid-cols-2 gap-3">
              {WINDSHIELD_PPF.map((v) => {
                const active = v.id === sizeId;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSizeId(v.id)}
                    aria-pressed={active}
                    className={`rounded-[10px] border p-5 text-left transition-colors ${
                      active ? "border-electric bg-electric/15" : "border-primary-foreground/15 bg-primary-foreground/[0.04] hover:border-primary-foreground/40"
                    }`}
                  >
                    <span className="block font-heading font-semibold text-primary-foreground">{v.label}</span>
                    <span className="mt-1 block text-xs leading-snug text-primary-foreground/55">{v.examples}</span>
                    <span className="mt-4 block font-heading text-2xl font-semibold tabular-nums text-primary-foreground">{money(v.price)}</span>
                  </button>
                );
              })}
            </div>
            <div className="rounded-[10px] bg-surface p-6 sm:p-8">
              <img src={WINDSHIELD_IMAGES[selected.id]} alt={`${selected.label} with windshield film`} loading="lazy" className="aspect-[16/9] w-full rounded-md object-cover" />
              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <p className="font-heading text-xl font-semibold text-ink">{selected.label}</p>
                  <p className="mt-1 text-sm text-muted-ink">Install {selected.installTime}, lasts up to 10 years</p>
                </div>
                <p className="font-heading text-4xl font-semibold tabular-nums text-ink">{money(selected.price)}</p>
              </div>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {INCLUDED.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-ink-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href={NAP.phoneHref} className={`${btnPrimary} mt-7 w-full`}>
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call to book, {money(selected.price)}
              </a>
            </div>
          </div>
        </Section>

        <Section tone="surface">
          <SectionHeading title="How it's installed" />
          <ProcessSteps steps={STEPS} />
        </Section>

        <ServiceFAQ title="Windshield film questions" faqs={faqs} />

        <ClosingCTA
          title="One chip costs more than the film"
          body="Spring and fall gravel season is when most windshields crack. Call or text to book an install."
          mode="quote"
          quoteHref="#pricing"
          quoteLabel="See pricing"
        />

        <Footer />
        <div className="h-20 lg:hidden" />
        <StickyMobileCTA />
      </div>
    </PageTransition>
  );
};

export default WindshieldPPF;
