import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import interiorImg from "@/assets/interior-detail.jpg";
import exteriorImg from "@/assets/exterior-detail.jpg";
import paintImg from "@/assets/paint-correction.jpg";
import gallery5 from "@/assets/gallery-5.jpg";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const posts = [
  {
    title: "Why Mobile Detailing is the Future of Car Care in Calgary",
    excerpt: "Discover why more Calgary drivers are choosing mobile detailing over traditional car washes — and how it saves you time, money, and hassle.",
    image: gallery5,
    date: "January 15, 2026",
  },
  {
    title: "Interior Detailing: What's Really Hiding in Your Car?",
    excerpt: "From bacteria to allergens, learn what's lurking in your car's interior and why professional detailing is essential for your health.",
    image: interiorImg,
    date: "January 8, 2026",
  },
  {
    title: "Ceramic Coating vs. Wax: Which is Better for Calgary Winters?",
    excerpt: "We break down the pros and cons of ceramic coating and wax to help you decide the best protection for Alberta's harsh weather.",
    image: paintImg,
    date: "December 20, 2025",
  },
  {
    title: "5 Signs Your Car Needs a Professional Detail",
    excerpt: "Not sure if your car needs detailing? Here are five telltale signs it's time to book a professional service.",
    image: exteriorImg,
    date: "December 10, 2025",
  },
];

const Blog = () => (
  <div className="min-h-screen">
    <Navbar />

    <section className="section-dark py-20">
      <div className="container">
        <h1 className="font-heading font-black text-3xl md:text-4xl uppercase text-primary-foreground text-center mb-4">Blog</h1>
        <p className="text-brand-gray text-center max-w-2xl mx-auto mb-12">Tips, insights, and news from Calgary's trusted mobile detailing experts.</p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {posts.map((post, i) => (
            <article key={i} className="bg-brand-dark-surface rounded-lg overflow-hidden group">
              <div className="h-48 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-6">
                <p className="text-primary text-xs font-heading font-semibold uppercase tracking-wider mb-2">{post.date}</p>
                <h3 className="font-heading font-bold text-lg text-primary-foreground mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-brand-gray text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="text-primary font-heading font-bold text-sm uppercase tracking-wider hover:text-brand-blue-glow transition-colors">
                  Read More →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="section-blue py-12">
      <div className="container text-center">
        <h2 className="font-heading font-black text-xl uppercase text-primary-foreground mb-4">Ready to Experience the Difference?</h2>
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-primary-foreground text-primary font-heading font-bold uppercase tracking-wider px-8 py-3 rounded text-sm hover:bg-primary-foreground/90 transition-colors">
          Book Now
        </a>
      </div>
    </section>

    <Footer />
  </div>
);

export default Blog;
