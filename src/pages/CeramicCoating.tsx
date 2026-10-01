import { Link } from "react-router-dom";
import { ArrowRight, Gem, Droplets, Sun, Timer, CheckCircle, MapPin } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ChatWidget from "@/components/ChatWidget";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import { NAP } from "@/data/copy";

const benefits = [
  { icon: Droplets, title: "Hydrophobic Surface", desc: "Water, brine and slush bead and sheet off instead of clinging. Winter grime rinses away with far less effort." },
  { icon: Sun, title: "UV & Oxidation Defence", desc: "A sacrificial ceramic layer absorbs UV exposure so your clear coat and trim do not fade and chalk." },
  { icon: Gem, title: "Depth and Gloss", desc: "Coatings cure into a hard, optically clear film that amplifies reflection — noticeably glossier than wax." },
  { icon: Timer, title: "Years, Not Weeks", desc: "A quality wax lasts weeks. A professionally applied ceramic coating is measured in years with proper maintenance." },
];

const process = [
  { n: "01", title: "Decontamination wash", desc: "Two-bucket wash, iron fallout dissolver, tar removal and a clay bar pass to leave the paint chemically clean." },
  { n: "02", title: "Paint correction", desc: "Machine polishing to remove swirls and etching. A coating locks in whatever is underneath, so this stage is not optional." },
  { n: "03", title: "Panel wipe", desc: "Every panel is stripped with a solvent wipe so the coating bonds directly to clear coat, not to polishing oils." },
  { n: "04", title: "Coating application", desc: "System X coating is applied panel by panel, levelled at the correct flash time, then inspected under multiple light sources." },
  { n: "05", title: "Cure window", desc: "The vehicle stays dry for the initial cure period. We hand over aftercare instructions and warranty registration." },
];

const faqs = [
  { q: "How long does a ceramic coating last in Calgary?", a: "Depending on the product tier and how the vehicle is stored and washed, expect anywhere from two to seven years. Alberta winters are hard on coatings, so a maintenance wash routine matters more here than in milder climates." },
  { q: "Does ceramic coating prevent rock chips?", a: "No. Ceramic coating is a chemical barrier, not an impact barrier. It resists brine, bug acid, bird droppings and UV, but it will not stop gravel. For chip protection you need paint protection film, and many clients combine both." },
  { q: "Is paint correction required before coating?", a: "Yes, in almost every case. A coating is optically clear and permanent for its lifespan, so any swirl marks or etching present at application will be sealed in and visible for years." },
  { q: "Can you coat wheels, glass and trim?", a: "Yes. Wheel faces, barrels, windshields and plastic trim can all be coated. Coated glass sheds water at highway speed and coated wheels release brake dust far more easily." },
  { q: "How do I wash a coated vehicle?", a: "Use a pH-neutral soap, a clean mitt and a two-bucket method, or a touchless wash. Avoid automatic brush washes — they inflict the exact swirls the correction stage removed." },
];

const CeramicCoating = () => (
  <PageTransition>
    <div className="min-h-screen pb-16 lg:pb-0">
      <SEO
        title="Ceramic Coating Calgary — System X Certified"
        description="Professional ceramic coating in Calgary. Full decontamination, paint correction and System X application for years of gloss, UV and brine protection."
        canonical="/ceramic-coating"
        jsonLd={[
          buildServiceJsonLd(
            "Ceramic Coating",
            "Professional ceramic coating installation in Calgary including decontamination, paint correction and System X coating application.",
            "/ceramic-coating",
          ),
          buildFAQJsonLd(faqs),
        ]}
      />
      <Navbar />
      <AutoBreadcrumbs />

      <section className="bg-brand-dark py-16 md:py-24">
        <div className="container max-w-4xl">
          
          <h1 className="font-heading font-semibold text-3xl md:text-5xl text-primary-foreground mb-5">
            Ceramic Coating in Calgary Built For Alberta Winters
          </h1>
          <p className="text-primary-foreground/80 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
            Six months a year, Calgary roads are coated in salt brine and magnesium chloride that stays wet on
            your panels well below freezing. A ceramic coating puts a hard, hydrophobic barrier between that
            chemistry and your clear coat — and makes every wash for the next several years dramatically easier.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={NAP.phoneHref}
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-heading font-bold px-8 py-4 rounded-lg text-sm hover:bg-primary/90 transition-colors"
            >
              Get A Coating Quote <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/ceramic-paint-correction"
              className="inline-flex items-center justify-center gap-2 border border-primary-foreground/20 text-primary-foreground font-heading font-bold px-8 py-4 rounded-lg text-sm hover:bg-primary-foreground/10 transition-colors"
            >
              See Packages &amp; Pricing
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 bg-background">
        <div className="container max-w-5xl">
          <h2 className="font-heading font-semibold text-2xl md:text-3xl text-foreground mb-8">
            What A Ceramic Coating Actually Does
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {benefits.map((item) => (
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
          <h2 className="font-heading font-semibold text-2xl md:text-3xl text-foreground mb-8">
            Our Coating Process
          </h2>
          <ol className="space-y-5">
            {process.map((step) => (
              <li key={step.n} className="flex gap-5 p-5 rounded-xl border border-border bg-card">
                <span className="font-heading font-semibold text-2xl text-primary/40 shrink-0">{step.n}</span>
                <div>
                  <h3 className="font-heading font-bold text-sm text-foreground mb-1">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-14 bg-background">
        <div className="container max-w-4xl">
          <h2 className="font-heading font-semibold text-2xl md:text-3xl text-foreground mb-6">
            Ceramic Coating vs Wax vs Paint Protection Film
          </h2>
          <div className="space-y-3">
            {[
              { label: "Wax or spray sealant", detail: "Weeks to a few months of gloss and beading. Cheap, easy, and gone by spring." },
              { label: "Ceramic coating", detail: "Years of chemical, UV and brine resistance plus easier washing. No impact protection." },
              { label: "Paint protection film", detail: "Physical, self-healing urethane that absorbs rock chips on high-impact panels." },
              { label: "PPF plus ceramic", detail: "Film on the impact zones, coating over the whole vehicle. The most complete option we offer." },
            ].map((row) => (
              <div key={row.label} className="flex gap-3 p-4 rounded-lg border border-border bg-card">
                <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  <span className="font-heading font-bold text-foreground">{row.label}:</span> {row.detail}
                </p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            Not sure which one you need? Read our guide on{" "}
            <Link to="/blog/ppf-vs-ceramic-coating-calgary" className="text-primary hover:underline">
              PPF vs ceramic coating for Calgary winters
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="py-14 bg-muted/30">
        <div className="container max-w-3xl">
          <h2 className="font-heading font-semibold text-2xl md:text-3xl text-foreground mb-8">
            Ceramic Coating FAQs
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

      <section className="py-14 bg-background">
        <div className="container max-w-4xl">
          <h2 className="font-heading font-semibold text-xl md:text-2xl text-foreground mb-5">
            Related Services
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              { to: "/ceramic-paint-correction", label: "Paint & Ceramics" },
              { to: "/paint-correction", label: "Paint Correction" },
              { to: "/protection/windshield-ppf", label: "Windshield PPF" },
              { to: "/auto-detailing", label: "Auto Detailing" },
              { to: "/rv-detailing", label: "RV Detailing" },
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
            Coatings installed for clients in Calgary, Airdrie, Chestermere, Cochrane, Okotoks and Rocky View County.
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

export default CeramicCoating;
