import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Expand } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import GoogleReviewBadge from "@/components/GoogleReviewBadge";
import ClosingCTA from "@/components/site/ClosingCTA";
import { Section, SectionHeading } from "@/components/site/Section";
import SEO from "@/components/SEO";
import ScrollRail from "@/components/site/ScrollRail";
import JobReceipts from "@/components/site/JobReceipts";
import Lightbox from "@/components/site/Lightbox";
import { VideoReel } from "@/components/site/VideoReel";
import { PHOTOS, CLIPS, type Photo, type PhotoCategory } from "@/data/photos";
import { JOB_CATEGORIES, type JobCategory } from "@/data/jobs";
import { useJobs } from "@/hooks/useJobs";
import galleryHero from "@/assets/jobs/hero-gallery.webp";

/** Gallery photo categories, kept as the descriptive (SEO) copy for the page. */
const sections: { title: string; description: string; category: PhotoCategory }[] = [
  {
    title: "RV & Trailer",
    description: "Oxidation removal, gelcoat polishing and full exteriors on travel trailers, fifth wheels and Class A motorhomes.",
    category: "rv",
  },
  {
    title: "Marine",
    description: "Pontoon and boat details: hull and tube restoration, gelcoat polish and marine vinyl cleaning.",
    category: "marine",
  },
  {
    title: "Paint Correction & Ceramic",
    description: "Multi-stage polishing and ceramic coatings that restore deep gloss and long-term protection.",
    category: "ceramic",
  },
  {
    title: "Exterior Detailing",
    description: "Hand wash, decontamination, polish and sealant. Paint that looks freshly delivered.",
    category: "exterior",
  },
  {
    title: "Interior Detailing",
    description: "Steam cleans, leather conditioning and full deep cleans that bring cabins back to like-new.",
    category: "interior",
  },
  {
    title: "Dealership Details",
    description: "Lot-ready prep and full details for dealership inventory, done on the lot.",
    category: "dealership",
  },
  {
    title: "Fleet & Heavy Equipment",
    description: "Vans, trucks and heavy equipment kept presentable and protected, on your site.",
    category: "fleet",
  },
  {
    title: "Wheels & Tires",
    description: "Iron-decon wheel cleans, tire dressing and caliper detailing.",
    category: "wheels",
  },
];

/** The five filters, and which photo categories feed each. */
const FILTER_PHOTOS: Record<JobCategory, PhotoCategory[]> = {
  car: ["exterior", "interior", "wheels"],
  rv: ["rv"],
  fleet: ["fleet", "dealership"],
  marine: ["marine"],
  ceramic_ppf: ["ceramic"],
};

const dedupe = (photos: Photo[]) => {
  const seen = new Set<string>();
  return photos.filter((p) => (seen.has(p.src) ? false : (seen.add(p.src), true)));
};

const ALL_PHOTOS = dedupe(sections.flatMap((s) => PHOTOS[s.category]));
const totalPhotos = sections.reduce((n, s) => n + PHOTOS[s.category].length, 0);

type Filter = "all" | JobCategory;
const isFilter = (v: string | null): v is Filter => v === "all" || JOB_CATEGORIES.some((c) => c.id === v);

const photosFor = (f: Filter) => (f === "all" ? ALL_PHOTOS : dedupe(FILTER_PHOTOS[f].flatMap((c) => PHOTOS[c])));

const Gallery = () => {
  const [params, setParams] = useSearchParams();
  const raw = params.get("type");
  const filter: Filter = isFilter(raw) ? raw : "all";
  const { data: jobs = [] } = useJobs();
  const [viewer, setViewer] = useState<number | null>(null);

  const photos = useMemo(() => photosFor(filter), [filter]);
  const shownJobs = useMemo(() => (filter === "all" ? jobs : jobs.filter((j) => j.category === filter)), [jobs, filter]);
  const filterLabel = filter === "all" ? "All work" : JOB_CATEGORIES.find((c) => c.id === filter)!.label;

  const setFilter = (f: Filter) => {
    const next = new URLSearchParams(params);
    if (f === "all") next.delete("type");
    else next.set("type", f);
    setParams(next, { replace: true, preventScrollReset: true });
  };

  const chips: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All", count: ALL_PHOTOS.length },
    ...JOB_CATEGORIES.map((c) => ({ id: c.id as Filter, label: c.label, count: photosFor(c.id).length })),
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-canvas">
        <SEO
          title="Detailing Before & After Gallery"
          description="Photos from real Calgary mobile detailing jobs: RV oxidation removal, paint correction, ceramic coating, interiors, dealership and fleet work."
          canonical="/gallery"
          jsonLd={{
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            name: "Xpress Auto & RV Detailing gallery",
            description: "Photos from real Calgary mobile detailing jobs: RV restoration, paint correction, ceramic coating, interiors and fleet work.",
            url: "https://xpressautodetail.ca/gallery",
          }}
        />
        <Navbar />
        <AutoBreadcrumbs />
        <ServicePageHero
          openings={false}
          title="Our work"
          subtitle={`${totalPhotos} photos from real jobs, every one a customer vehicle shot on site by our crew. No stock images.`}
          image={galleryHero}
        />

        {/* Filters */}
        <nav aria-label="Filter the gallery" className="sticky top-header z-30 border-b border-line bg-surface/95 backdrop-blur">
          <div className="shell flex items-center gap-4 py-3">
            <ul className="no-scrollbar -mx-1 flex flex-1 gap-1.5 overflow-x-auto px-1">
              {chips.map((c) => {
                const on = filter === c.id;
                return (
                  <li key={c.id} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => setFilter(c.id)}
                      aria-pressed={on}
                      className={`inline-flex h-10 items-center gap-2 rounded-md border px-4 text-sm font-semibold transition-colors ${
                        on ? "border-ink bg-ink text-primary-foreground" : "border-line bg-surface text-ink-2 hover:border-ink-2 hover:text-ink"
                      }`}
                    >
                      {c.label}
                      <span className={`num text-xs ${on ? "text-primary-foreground/60" : "text-muted-ink"}`}>{c.count}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <a href="#videos" className="hidden shrink-0 text-sm font-semibold text-ink-2 hover:text-electric sm:block">
              Videos
            </a>
          </div>
        </nav>

        {/* Job receipts */}
        {shownJobs.length > 0 && (
          <Section id="receipts" className="scroll-mt-40">
            <SectionHeading
              eyebrow={filterLabel}
              title="Job receipts"
              intro="Real jobs written up the way we log them: the vehicle, the work and the details. Tap a photo to see the whole job."
            />
            <JobReceipts jobs={shownJobs} layout="rail" />
          </Section>
        )}

        {/* Photo library */}
        <Section tone="surface" id="photos" className="scroll-mt-40">
          <SectionHeading eyebrow={filterLabel} title="Photo library" intro="Every photo is a customer vehicle, shot on site by our crew." />
          <ScrollRail
            key={filter}
            label={`${filterLabel} photos`}
            rows={2}
            itemClass="w-[64vw] sm:w-[34vw] lg:w-[22vw] xl:w-[300px]"
            meta={`${photos.length} photos`}
          >
            {photos.map((p, i) => (
              <button
                key={p.src}
                type="button"
                onClick={() => setViewer(i)}
                aria-label={`View larger: ${p.alt}`}
                className="group relative block w-full overflow-hidden rounded-sm bg-line"
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span className="pointer-events-none absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-sm bg-surface/90 text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Expand className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
            ))}
          </ScrollRail>
          <Lightbox
            items={photos.map((p) => ({ src: p.src, alt: p.alt, detail: p.alt }))}
            index={viewer}
            onIndex={setViewer}
            label={`${filterLabel} photos`}
          />
        </Section>

        {/* Videos */}
        <Section tone="dark" id="videos" className="scroll-mt-40">
          <SectionHeading dark title="On the job" intro="Short clips from recent RV, paint correction and detailing jobs." />
          <VideoReel clips={[CLIPS.rvCrewWash, CLIPS.paintCorrection, CLIPS.rvWalkaround, CLIPS.teslaDetail]} label="Job videos" />
          <div className="mt-4 grid gap-3 sm:mt-6 sm:gap-4">
            <VideoReel clips={[CLIPS.trailerPolish, CLIPS.rvInterior, CLIPS.jeepShop, CLIPS.defenderShop]} label="More job videos" />
          </div>
          <p className="mt-10 text-sm font-semibold text-primary-foreground">Full RV restoration videos</p>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:max-w-xl">
            {["/videos/rv-video-1.mp4", "/videos/rv-video-3.mp4"].map((v) => (
              <video key={v} className="aspect-[9/16] w-full rounded-card bg-charcoal-2 object-cover" controls muted playsInline preload="metadata">
                <source src={v} type="video/mp4" />
              </video>
            ))}
          </div>
        </Section>

        {/* What's in the gallery */}
        <Section>
          <SectionHeading title="What's in the gallery" />
          <dl className="grid gap-x-10 gap-y-8 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {sections.map((s) => (
              <div key={s.title}>
                <dt className="font-heading text-xl font-bold text-ink">{s.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink-2">{s.description}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <GoogleReviewBadge />
        <ClosingCTA title="Want results like these?" />

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Gallery;
