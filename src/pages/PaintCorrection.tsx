import { Link } from "react-router-dom";
import { ArrowRight, Search, Layers, Sparkles, CheckCircle, MapPin } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ChatWidget from "@/components/ChatWidget";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import { NAP } from "@/data/copy";

const defects = [
  "Swirl marks from automatic car washes",
  "Wash-induced micro-marring",
  "Buffer trails from previous shops",
  "Water spot etching",
  "Bird dropping and bug acid etching",
  "Light oxidation and dullness",
  "Road rash haze on lower panels",
  "Uneven gloss after a repaint",
];

const stages = [
  { icon: Search, title: "Paint inspection", desc: "Paint depth readings and inspection under LED and halogen light to map defect type and depth before a pad ever touches the panel." },
  { icon: Layers, title: "Single-stage polish", desc: "One cutting-and-finishing step that removes the majority of light swirls and restores gloss. Best value for daily drivers." },
  { icon: Sparkles, title: "Two-stage correction", desc: "A dedicated compounding pass followed by a refinement polish. Removes deeper defects and finishes to a true show gloss." },
];

const faqs = [
  { q: "What is paint correction?", a: "Paint correction is the mechanical removal of a microscopic layer of clear coat using machine polishers, abrasive compounds and pads. Removing that layer levels the surface so swirls, scratches and etching no longer scatter light." },
  { q: "Can every scratch be polished out?", a: "No. If a scratch catches your fingernail it has usually gone through the clear coat, and polishing further would compromise the panel. Those defects need touch-up or refinishing rather than correction." },
  { q: "How much clear coat is removed?", a: "A properly executed correction removes only a few microns. We take paint depth readings first specifically to make sure we stay well inside a safe margin on every panel." },
  { q: "Should I get paint correction before a ceramic coating?", a: "Yes. A ceramic coating is optically clear and lasts for years, so any defect present at the time of application is sealed under it. Correction first, coating second, always." },
  { q: "How long do the results last?", a: "The correction itself is permanent — that clear coat is gone for good. How long it stays looking corrected depends entirely on wash technique. Protecting it with a coating and avoiding brush washes is what preserves it." },
];

const PaintCorrection = () => (
  <PageTransition>
    <div className="min-h-screen pb-16 lg:pb-0">
      <SEO
        title="Paint Correction Calgary — Swirl & Scratch Removal"
        description="Professional paint correction in Calgary. Machine polishing that removes swirl marks, buffer trails and etching, with paint depth readings on every panel."
        canonical="/paint-correction"
        jsonLd={[
          buildServiceJsonLd(
            "Paint Correction",
            "Machine paint correction in Calgary — swirl removal, compounding and refinement polishing with paint depth measurement.",
            "/paint-correction",
          ),
          buildFAQJsonLd(faqs),
        ]}
      />
      <Navbar />
      <AutoBreadcrumbs />

      <section className="bg-brand-dark py-16 md:py-24">
        <div className="container max-w-4xl">
          
          <h1 className="font-heading font-semibold text-3xl md:text-5xl text-primary-foreground mb-5">
            Paint Correction in Calgary Swirls Gone For Good
          </h1>
          <p className="text-primary-foreground/80 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
            Those fine spiderweb scratches that appear under direct sun are wash-induced swirls in your clear
            coat. Polish removes them permanently. We take paint depth readings first, correct under proper
            lighting, and finish with a protective layer so the work lasts.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={NAP.phoneHref}
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-heading font-bold px-8 py-4 rounded-lg text-sm hover:bg-primary/90 transition-colors"
            >
              Book A Paint Assessment <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/ceramic-paint-correction"
              className="inline-flex items-center justify-center gap-2 border border-primary-foreground/20 text-primary-foreground font-heading font-bold px-8 py-4 rounded-lg text-sm hover:bg-primary-foreground/10 transition-colors"
            >
              See Correction Packages
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 bg-background">
        <div className="container max-w-5xl">
          <h2 className="font-heading font-semibold text-2xl md:text-3xl text-foreground mb-8">
            Correction Stages
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {stages.map((item) => (
              <div key={item.title} className="p-6 rounded-xl border border-border bg-card">
                <item.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-heading font-bold text-sm text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-muted/30">
        <div className="container max-w-4xl">
          <h2 className="font-heading font-semibold text-2xl md:text-3xl text-foreground mb-6">
            Defects We Correct
          </h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {defects.map((defect) => (
              <li key={defect} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                {defect}
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-6">
            Deep scratches that reach primer or bare metal cannot be polished out safely — we will tell you that
            up front rather than chase them with a machine.
          </p>
        </div>
      </section>

      <section className="py-14 bg-background">
        <div className="container max-w-3xl">
          <h2 className="font-heading font-semibold text-2xl md:text-3xl text-foreground mb-8">
            Paint Correction FAQs
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="p-5 rounded-xl border border-border bg-card">
                <h3 className="font-heading font-bold text-sm text-foreground mb-2">{faq.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-muted/30">
        <div className="container max-w-4xl">
          <h2 className="font-heading font-semibold text-xl md:text-2xl text-foreground mb-5">
            Related Services
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              { to: "/ceramic-coating", label: "Ceramic Coating" },
              { to: "/ceramic-paint-correction", label: "Paint & Ceramics" },
              { to: "/protection/ppf", label: "Paint Protection Film" },
              { to: "/detailing?tab=exterior", label: "Exterior Detailing" },
              { to: "/auto-detailing", label: "Auto Detailing" },
              { to: "/gallery", label: "Gallery" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 rounded-full border border-border bg-card text-sm text-foreground hover:border-primary/50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="flex items-center gap-2 text-sm text-muted-foreground mt-8">
            <MapPin className="w-4 h-4 text-primary" />
            Paint correction for clients across Calgary, Airdrie, Chestermere, Cochrane, Okotoks and Rocky View County.
          </p>
        </div>
      </section>

      <Footer />
      <div className="h-20 lg:hidden" />
      <StickyMobileCTA />
      <ChatWidget />
    </div>
  </PageTransition>
);

export default PaintCorrection;
