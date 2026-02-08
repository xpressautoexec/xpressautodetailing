import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
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

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const images = [
  { src: gallery1, alt: "Professional detailing equipment" },
  { src: gallery2, alt: "Freshly detailed red sports car" },
  { src: gallery3, alt: "Clean car interior" },
  { src: gallery4, alt: "Tire and wheel detailing" },
  { src: gallery5, alt: "SUV foam wash" },
  { src: gallery6, alt: "Ceramic coated hood reflection" },
  { src: interiorImg, alt: "Interior detailing service" },
  { src: exteriorImg, alt: "Exterior detailing service" },
  { src: paintImg, alt: "Paint correction result" },
];

const Gallery = () => (
  <div className="min-h-screen">
    <Navbar />
    <ServicePageHero title="Our Work" image={galleryHero} />

    <section className="py-16 bg-background">
      <div className="container">
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground text-center mb-4">
          See the <span className="text-primary">Transformation</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Browse through some of our recent projects. Every vehicle gets our full attention and the professional treatment it deserves.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <div key={i} className="overflow-hidden rounded-lg group aspect-square">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-blue py-16">
      <div className="container text-center">
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-primary-foreground mb-4">
          Want Results Like These?
        </h2>
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-primary-foreground text-primary font-heading font-bold uppercase tracking-wider px-8 py-4 rounded text-sm hover:bg-primary-foreground/90 transition-colors">
          Book Your Detail Now
        </a>
      </div>
    </section>

    <Footer />
  </div>
);

export default Gallery;
