import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import interiorImg from "@/assets/gallery-bmw-red-interior.jpg";
import exteriorImg from "@/assets/gallery-21.jpg";
import paintImg from "@/assets/gallery-bmw-emblem.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import rvSurveyorFull from "@/assets/gallery-rv-surveyor-full.jpg";
import catExcavatorExt1 from "@/assets/gallery-cat-excavator-exterior-1.jpg";
import bmwHeadlight from "@/assets/gallery-bmw-headlight.jpg";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const posts = [
  {
    title: "The Xpress Pass: How a Monthly Detailing Membership Pays for Itself",
    excerpt: "Over 200 Calgarians are already on The Xpress Pass — saving up to 20% on every detail and 15% on every add-on. We break down the real math: how often most owners book, what they actually save in a year, and why locking in your discount beats one-off bookings.",
    image: bmwHeadlight,
    date: "May 22, 2026",
  },
  {
    title: "SUV vs Sedan: Why Detailing Larger Vehicles Costs More (And What You're Actually Paying For)",
    excerpt: "A truck isn't just a bigger sedan — it's more carpet, more leather, deeper crevices, and double the exterior surface area. Here's an honest breakdown of why size-based pricing exists, what extra steps we take on SUVs and trucks, and how to keep larger vehicles in showroom shape for less.",
    image: gallery3,
    date: "May 10, 2026",
  },

  {
    title: "Spring Paint Decontamination: Why Your Car Needs It After a Calgary Winter",
    excerpt: "Six months of road salt, mag chloride, and gravel leaves microscopic contamination bonded to your clear coat. We walk through iron decon, clay bar treatment, and a one-step polish to reset your paint before sealing it for summer.",
    image: bmwHeadlight,
    date: "April 18, 2026",
  },
  {
    title: "RV Oxidation Removal: Restoring Faded Fiberglass Before Camping Season",
    excerpt: "That chalky white film on your trailer's gel coat isn't just ugly — it's failing UV protection. Here's the multi-stage compounding and sealing process we use to bring 10-year-old rigs back to a deep, wet gloss that lasts a full season.",
    image: rvSurveyorFull,
    date: "April 8, 2026",
  },
  {
    title: "Fleet Detailing ROI: Why Calgary Companies Are Switching to Scheduled Service",
    excerpt: "Clean trucks book more jobs, sell more units, and last longer between resale. We break down the real numbers behind monthly fleet detailing — including a case study from a 12-vehicle service company that cut their replacement cycle by 18 months.",
    image: catExcavatorExt1,
    date: "March 28, 2026",
  },
  {
    title: "Why Mobile Detailing is the Future of Car Care in Calgary",
    excerpt: "Discover why more Calgary drivers are choosing mobile detailing over traditional car washes — and how it saves you time, money, and hassle. From skipping the drive to the shop to getting dealership-quality results in your own driveway, mobile detailing is changing the game for busy Albertans.",
    image: gallery5,
    date: "January 15, 2026",
  },
  {
    title: "Interior Detailing: What's Really Hiding in Your Car?",
    excerpt: "From bacteria to allergens, learn what's lurking in your car's interior and why professional detailing is essential for your health. Studies show the average steering wheel has more bacteria than a public toilet — here's what you can do about it.",
    image: interiorImg,
    date: "January 8, 2026",
  },
  {
    title: "Ceramic Coating vs. Wax: Which is Better for Calgary Winters?",
    excerpt: "We break down the pros and cons of ceramic coating and wax to help you decide the best protection for Alberta's harsh weather. Spoiler: one of them lasts 50x longer than the other.",
    image: paintImg,
    date: "December 20, 2025",
  },
  {
    title: "5 Signs Your Car Needs a Professional Detail",
    excerpt: "Not sure if your car needs detailing? Here are five telltale signs it's time to book a professional service — from mystery smells to fading paint that's lost its sparkle.",
    image: exteriorImg,
    date: "December 10, 2025",
  },
  {
    title: "How to Protect Your Car's Paint Through Calgary Winters",
    excerpt: "Road salt, gravel, and freezing temperatures wreak havoc on your vehicle's finish. Learn the essential steps to protect your paint and keep it looking sharp from November to March.",
    image: gallery1,
    date: "November 28, 2025",
  },
  {
    title: "The Complete Guide to Detailing Your Car Before Selling It",
    excerpt: "Want to get top dollar for your trade-in or private sale? A professional detail can increase your vehicle's perceived value by $1,000–$3,000. Here's exactly what to do and why it works.",
    image: gallery3,
    date: "November 15, 2025",
  },
];

const Blog = () => (
  <PageTransition><div className="min-h-screen">
    <SEO
      title="Car Detailing Blog Calgary"
      description="Expert car detailing tips on paint protection, interior care, ceramic coatings & seasonal prep from Calgary's top-rated mobile detailers."
      canonical="/blog"
    />
    <Navbar />

    <section className="py-20 bg-background">
      <div className="container">
        <h1 className="font-heading font-black text-3xl md:text-4xl uppercase text-foreground text-center mb-4">Car Detailing Tips & Guides — Calgary</h1>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">Tips, insights, and news from Calgary's trusted mobile detailing experts. Stay informed about the best ways to protect and maintain your vehicle.</p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {posts.map((post, i) => (
            <article key={i} className="bg-background rounded-lg overflow-hidden group border border-border hover:border-primary/30 transition-colors">
              <div className="h-48 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-6">
                <p className="text-primary text-xs font-heading font-semibold uppercase tracking-wider mb-2">{post.date}</p>
                <h3 className="font-heading font-bold text-lg text-foreground mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="text-primary font-heading font-bold text-sm uppercase tracking-wider hover:text-brand-blue-glow transition-colors">
                  Read More →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="py-12 bg-primary">
      <div className="container text-center">
        <h2 className="font-heading font-black text-xl uppercase text-primary-foreground mb-4">Ready to Experience the Difference?</h2>
        <p className="text-primary-foreground/80 max-w-lg mx-auto mb-6">
          Stop reading about it and start experiencing it. Book your mobile detail today and see why Calgary trusts Xpress Auto Detailing.
        </p>
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-primary-foreground text-primary font-heading font-bold uppercase tracking-wider px-8 py-3 rounded text-sm hover:bg-primary-foreground/90 transition-colors">
          Book Now
        </a>
      </div>
    </section>

    <Footer />
  </div></PageTransition>
);

export default Blog;
