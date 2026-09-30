import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import CancellationPolicy from "@/components/CancellationPolicy";
import SEO from "@/components/SEO";
import { CANCELLATION_SUMMARY } from "@/data/copy";
import { PHONE } from "@/data/pricing";

const CancellationPolicyPage = () => (
  <PageTransition>
    <div className="min-h-screen bg-canvas pb-16 lg:pb-0">
      <SEO
        title="Cancellation & Rescheduling Policy | Xpress Auto & RV Detailing"
        description={CANCELLATION_SUMMARY}
        canonical="/cancellation-policy"
      />
      <Navbar />
      <AutoBreadcrumbs />
      <section className="border-b border-line bg-surface py-14 sm:py-20">
        <div className="shell max-w-3xl">
          <h1 className="font-heading text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl">
            Cancellation and rescheduling
          </h1>
          <p className="mt-4 text-[15px] text-ink-2">
            Need to change a booking? Call or text{" "}
            <a href={`tel:${PHONE.replace(/-/g, "")}`} className="font-semibold text-electric hover:underline">
              {PHONE}
            </a>
            .
          </p>
        </div>
      </section>
      <section className="py-14 sm:py-20">
        <div className="shell max-w-3xl">
          <CancellationPolicy />
        </div>
      </section>
      <Footer />
      <div className="h-20 lg:hidden" />
      <StickyMobileCTA />
    </div>
  </PageTransition>
);

export default CancellationPolicyPage;
