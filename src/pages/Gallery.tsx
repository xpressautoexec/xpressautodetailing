import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import TrustStats from "@/components/TrustStats";
import SEO from "@/components/SEO";
import galleryHero from "@/assets/gallery-hero.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";
import gallery9 from "@/assets/gallery-9.jpg";
import gallery10 from "@/assets/gallery-10.jpg";
import gallery11 from "@/assets/gallery-11.jpg";
import gallery12 from "@/assets/gallery-12.jpg";
import gallery13 from "@/assets/gallery-13.jpg";
import gallery14 from "@/assets/gallery-14.jpg";
import gallery15 from "@/assets/gallery-15.jpg";
import gallery16 from "@/assets/gallery-16.jpg";
import gallery17 from "@/assets/gallery-17.jpg";
import gallery18 from "@/assets/gallery-18.jpg";
import gallery19 from "@/assets/gallery-19.jpg";
import gallery20 from "@/assets/gallery-20.jpg";
import gallery21 from "@/assets/gallery-21.jpg";
import gallery22 from "@/assets/gallery-22.jpg";
import gallery23 from "@/assets/gallery-23.jpg";
import gallery24 from "@/assets/gallery-24.jpg";
import gallery25 from "@/assets/gallery-25.jpg";
import gallery26 from "@/assets/gallery-26.jpg";
import gallery27 from "@/assets/gallery-27.jpg";
import gallery28 from "@/assets/gallery-28.jpg";
import gallery29 from "@/assets/gallery-29.jpg";
import gallery30 from "@/assets/gallery-30.jpg";
import gallery31 from "@/assets/gallery-31.jpg";
import gallery32 from "@/assets/gallery-32.jpg";
import gallery33 from "@/assets/gallery-33.jpg";
import gallery34 from "@/assets/gallery-34.jpg";
import gallery35 from "@/assets/gallery-35.jpg";
import gallery36 from "@/assets/gallery-36.jpg";
import gallery37 from "@/assets/gallery-37.jpg";
import gallery38 from "@/assets/gallery-38.jpg";
import gallery39 from "@/assets/gallery-39.jpg";
import interiorImg from "@/assets/interior-detail.jpg";
import exteriorImg from "@/assets/exterior-detail.jpg";
import paintImg from "@/assets/paint-correction.jpg";
import { Star } from "lucide-react";

const images = [
  { src: gallery1, alt: "Glossy black BMW sedan after professional detailing", category: "Exterior" },
  { src: gallery2, alt: "Freshly polished red sports car with mirror finish", category: "Exterior" },
  { src: gallery3, alt: "Luxury sports car with flawless paint after ceramic coating", category: "Ceramic" },
  { src: gallery4, alt: "Car wheel and tire cleaned and dressed to perfection", category: "Wheels" },
  { src: gallery5, alt: "Professional foam wash being applied to vehicle exterior", category: "Exterior" },
  { src: gallery6, alt: "Clean white sedan showcasing professional exterior detail", category: "Exterior" },
  { src: gallery7, alt: "DIRTT Construction Systems fleet van after professional wash", category: "Fleet" },
  { src: gallery8, alt: "Vehicle detailing result showcasing professional finish", category: "Exterior" },
  { src: gallery9, alt: "Freshly detailed vehicle with clean finish", category: "Exterior" },
  { src: gallery10, alt: "Professional detailing result on client vehicle", category: "Exterior" },
  { src: gallery11, alt: "Detailed vehicle showcasing quality workmanship", category: "Exterior" },
  { src: gallery12, alt: "Vehicle after professional exterior detail service", category: "Exterior" },
  { src: gallery13, alt: "Clean and polished vehicle after full detail", category: "Exterior" },
  { src: gallery14, alt: "Professional detailing results on client car", category: "Exterior" },
  { src: gallery15, alt: "Vehicle showcasing professional detailing quality", category: "Exterior" },
  { src: gallery16, alt: "Pristine Audi interior after deep cleaning and conditioning", category: "Interior" },
  { src: gallery17, alt: "Professional detailing work on client vehicle", category: "Exterior" },
  { src: gallery18, alt: "Freshly detailed vehicle with mirror finish", category: "Exterior" },
  { src: gallery19, alt: "Vehicle after professional wash and detail", category: "Exterior" },
  { src: gallery20, alt: "Silver Audi RS5 after full exterior detail", category: "Exterior" },
  { src: gallery21, alt: "Black Tesla Model S with mirror-like paint finish", category: "Exterior" },
  { src: gallery22, alt: "Black Audi S5 freshly detailed in driveway", category: "Exterior" },
  { src: gallery23, alt: "KLS fleet Ford F-150 detailed in shop", category: "Fleet" },
  { src: gallery24, alt: "Professional vehicle detailing result", category: "Exterior" },
  { src: gallery25, alt: "Vehicle showcasing expert detailing quality", category: "Exterior" },
  { src: gallery26, alt: "Blue BMW M340i with deep gloss under studio lighting", category: "Ceramic" },
  { src: gallery27, alt: "BMW interior with protective steering wheel cover after detail", category: "Interior" },
  { src: gallery28, alt: "Blue BMW M340i rear view with glowing taillights", category: "Exterior" },
  { src: gallery29, alt: "Silver Audi RS5 freshly detailed in driveway", category: "Exterior" },
  { src: gallery30, alt: "Professional detailing work on client vehicle", category: "Exterior" },
  { src: gallery31, alt: "Vehicle after professional detail service", category: "Exterior" },
  { src: gallery32, alt: "Freshly detailed vehicle showcasing quality", category: "Exterior" },
  { src: gallery33, alt: "Professional detailing result on vehicle", category: "Exterior" },
  { src: gallery34, alt: "Vehicle detail showcasing professional finish", category: "Exterior" },
  { src: gallery35, alt: "Freshly detailed vehicle exterior", category: "Exterior" },
  { src: gallery36, alt: "Professional vehicle detailing result", category: "Exterior" },
  { src: gallery37, alt: "Clean vehicle after full detail service", category: "Exterior" },
  { src: gallery38, alt: "Vehicle showcasing expert detailing work", category: "Exterior" },
  { src: gallery39, alt: "Professional detailing quality on display", category: "Exterior" },
  { src: interiorImg, alt: "Pristine car interior after deep cleaning and conditioning", category: "Interior" },
  { src: exteriorImg, alt: "Shiny red car parked after full exterior detailing service", category: "Exterior" },
  { src: paintImg, alt: "Luxury vehicle with corrected paint showing deep gloss finish", category: "Paint Correction" },
];

const Gallery = () => (
  <PageTransition><div className="min-h-screen">
    <SEO
      title="Before & After Gallery — Xpress Auto Detailing"
      description="See real results: before & after photos of interior deep cleans, paint corrections, ceramic coatings & full details on Calgary vehicles. Judge for yourself."
      canonical="/gallery"
    />
    <Navbar />
    <ServicePageHero title="Our Work" image={galleryHero} />
    <TrustStats />

    <section className="py-16 bg-background">
      <div className="container">
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground text-center mb-4">
          See the <span className="text-primary">Transformation</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Browse through some of our recent projects. Every vehicle gets our full attention and the professional treatment it deserves. From quick maintenance washes to full paint corrections and ceramic coatings — these results speak for themselves.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <div key={i} className="overflow-hidden rounded-lg group aspect-square relative">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-heading font-bold text-sm uppercase">{img.category}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Video Section */}
        <h3 className="font-heading font-black text-xl md:text-2xl uppercase text-foreground text-center mt-16 mb-8">
          Videos
        </h3>
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="rounded-xl overflow-hidden shadow-lg border border-border">
            <video className="w-full aspect-video object-cover" controls muted playsInline preload="metadata">
              <source src="/videos/rv-video-1.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg border border-border">
            <video className="w-full aspect-video object-cover" controls muted playsInline preload="metadata">
              <source src="/videos/rv-video-2.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>

    {/* Client Reactions */}
    <section className="py-16 bg-muted/30">
      <div className="container max-w-5xl">
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground text-center mb-12">
          Client Reactions
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { quote: "I didn't know my white car could be this white again. The transformation was unreal.", name: "Sandra K.", service: "Complete Detail" },
            { quote: "My 10-year-old Civic looks better now than it did when I bought it. The paint correction was worth every dollar.", name: "Matt P.", service: "Paint Correction" },
            { quote: "The before and after on my interior was jaw-dropping. Years of coffee stains, gone in 2 hours.", name: "Nina R.", service: "Deep Clean + Shield" },
          ].map((t, i) => (
            <div key={i} className="p-6 rounded-lg border border-border bg-background">
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground italic text-sm leading-relaxed mb-3">"{t.quote}"</p>
              <p className="font-heading font-bold text-foreground text-xs">{t.name}</p>
              <p className="text-muted-foreground text-xs">{t.service}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 bg-primary">
      <div className="container text-center">
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-primary-foreground mb-4">
          Want Results Like These?
        </h2>
        <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
          Every vehicle in our gallery started just like yours. Book your detail today and your car could be our next showcase.
        </p>
        <a href="tel:5875004523" className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-heading font-bold uppercase tracking-wider px-8 py-4 rounded text-sm hover:bg-primary-foreground/90 transition-colors">
          Call Now
        </a>
      </div>
    </section>

    <Footer />
  </div></PageTransition>
);

export default Gallery;
