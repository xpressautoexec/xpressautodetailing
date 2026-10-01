import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { btnPrimary, btnSecondary } from "@/components/site/Section";
import { NAP } from "@/data/copy";

const NotFound = () => (
  <div className="min-h-screen bg-canvas">
    <SEO title="Page not found | Xpress Auto & RV Detailing" description="This page doesn't exist." noindex />
    <Navbar />
    <section className="shell py-24 sm:py-32">
      <p className="text-sm text-muted-ink">404</p>
      <h1 className="mt-2 font-heading text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl">That page doesn't exist</h1>
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-2">
        It may have moved when we updated the site. Start from the home page, or call or text {NAP.phone}.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link to="/" className={btnPrimary}>
          Go to the home page
        </Link>
        <Link to="/rv-trailer" className={btnSecondary}>
          RV detailing
        </Link>
        <Link to="/detailing" className={btnSecondary}>
          Car detailing
        </Link>
      </div>
    </section>
    <Footer />
  </div>
);

export default NotFound;
