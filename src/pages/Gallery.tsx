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
import interiorImg from "@/assets/interior-detail.jpg";
import exteriorImg from "@/assets/exterior-detail.jpg";
import paintImg from "@/assets/paint-correction.jpg";
import { Star } from "lucide-react";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const images = [
  { src: gallery1, alt: "Professional detailing equipment", category: "Equipment" },
  { src: gallery2, alt: "Freshly detailed red sports car", category: "Exterior" },
  { src: gallery3, alt: "Clean car interior", category: "Interior" },
  { src: gallery4, alt: "Tire and wheel detailing", category: "Wheels" },
  { src: gallery5, alt: "SUV foam wash", category: "Exterior" },
  { src: gallery6, alt: "Ceramic coated hood reflection", category: "Ceramic" },
  { src: interiorImg, alt: "Interior detailing service", category: "Interior" },
  { src: exteriorImg, alt: "Exterior detailing service", category: "Exterior" },
  { src: paintImg, alt: "Paint correction result", category: "Paint Correction" },
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
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-primary-foreground text-primary font-heading font-bold uppercase tracking-wider px-8 py-4 rounded text-sm hover:bg-primary-foreground/90 transition-colors">
          Book Your Detail Now
        </a>
      </div>
    </section>

    <Footer />
  </div></PageTransition>
);

export default Gallery;
