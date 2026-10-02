import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import GoogleReviewBadge from "@/components/GoogleReviewBadge";
import ClosingCTA from "@/components/site/ClosingCTA";
import { Section, SectionHeading } from "@/components/site/Section";

import SEO from "@/components/SEO";
import { PhotoRail } from "@/components/site/PhotoRail";
import { VideoReel } from "@/components/site/VideoReel";
import { PHOTOS, CLIPS, type PhotoCategory } from "@/data/photos";
import galleryHero from "@/assets/jobs/hero-gallery.webp";

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

const slug = (t: string) => t.toLowerCase().replace(/[^a-z]+/g, "-").replace(/(^-|-$)/g, "");
const totalPhotos = sections.reduce((n, s) => n + PHOTOS[s.category].length, 0);

const Gallery = () => (
  <PageTransition>
    <div className="min-h-screen bg-canvas pb-16 lg:pb-0">
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
        title="Our work"
        subtitle={`${totalPhotos} photos from real jobs, every one a customer vehicle shot on site by our crew. No stock images.`}
        image={galleryHero}
        video={CLIPS.trailerPolish}
      />

      <nav aria-label="Gallery categories" className="sticky top-[60px] z-30 border-b border-line bg-surface/95 backdrop-blur lg:top-[68px]">
        <ul className="shell no-scrollbar flex gap-6 overflow-x-auto py-3 text-sm">
          {sections.map((sec) => (
            <li key={sec.title} className="shrink-0">
              <a href={`#${slug(sec.title)}`} className="font-medium text-ink-2 hover:text-ink">
                {sec.title}
              </a>
            </li>
          ))}
          <li className="shrink-0">
            <a href="#videos" className="font-medium text-ink-2 hover:text-ink">
              Videos
            </a>
          </li>
        </ul>
      </nav>

      {sections.map((sec, i) => (
        <Section key={sec.title} id={slug(sec.title)} tone={i % 2 ? "surface" : "canvas"} className="scroll-mt-32">
          <SectionHeading title={sec.title} intro={sec.description} />
          <PhotoRail photos={PHOTOS[sec.category]} label={`${sec.title} photos`} />
        </Section>
      ))}

      <Section tone="dark" id="videos" className="scroll-mt-32">
        <SectionHeading dark title="On the job" intro="Short clips from recent RV, paint correction and detailing jobs." />
        <VideoReel clips={[CLIPS.rvCrewWash, CLIPS.paintCorrection, CLIPS.rvWalkaround, CLIPS.teslaDetail]} label="Job videos" />
        <div className="mt-4 grid gap-3 sm:mt-6 sm:gap-4">
          <VideoReel clips={[CLIPS.trailerPolish, CLIPS.rvInterior, CLIPS.jeepShop, CLIPS.defenderShop]} label="More job videos" />
        </div>
        <p className="mt-10 text-sm font-semibold text-primary-foreground">Full RV restoration videos</p>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:max-w-xl">
          {["/videos/rv-video-1.mp4", "/videos/rv-video-3.mp4"].map((v) => (
            <video key={v} className="aspect-[9/16] w-full rounded-[6px] bg-brand-dark object-cover" controls muted playsInline preload="metadata">
              <source src={v} type="video/mp4" />
            </video>
          ))}
        </div>
      </Section>

      <GoogleReviewBadge />
      <ClosingCTA title="Want results like these?" />

      <Footer />
      <div className="h-20 lg:hidden" />
      <StickyMobileCTA />
    </div>
  </PageTransition>
);

export default Gallery;
