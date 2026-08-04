import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ScrollReveal from "@/components/ScrollReveal";

const faqs = [
  { q: "How long does a full car detailing take?", a: "It depends on the package and condition of your vehicle. On average, a full detail takes between 2.33 to 4.33 hours. Heavily soiled vehicles may take longer." },
  { q: "Can car detailing remove smoke or vomit smells?", a: "Yes! We use professional-grade odour neutralizers and ozone treatments to remove tough smells like smoke, vomit, and mildew — not just mask them." },
  { q: "Can detailing remove mould from the interior?", a: "In most cases, yes. We carefully clean and sanitize affected areas to eliminate mould and prevent it from returning. If it's widespread, extra charges may apply." },
  { q: "Can detailing remove scratches from the paint?", a: "Light surface scratches can often be reduced or removed with a polish or paint correction. Deep scratches that go through the clear coat may require bodywork." },
  { q: "Can you fix paint chips or rock chips?", a: "We do not offer body shop-level repairs, but we can provide minor touch-up work to improve the appearance of small paint chips upon request." },
  { q: "What if there's heavy staining, pet hair, or an unknown smell?", a: "We can tackle most issues, but some deep stains, smells, or damage may be permanent. If it requires extra time or tools, we'll let you know about any added cost upfront." },
  { q: "Is car detailing worth it in Calgary?", a: "Absolutely! Detailing protects your car from Alberta's harsh seasons, maintains resale value, and makes your vehicle more enjoyable to drive." },
  { q: "What does car detailing include?", a: "Detailing is a deep cleaning of your vehicle, inside and out. It includes vacuuming, steam cleaning, polishing, shampooing, and more, depending on your package." },
  { q: "Do you come to me?", a: "Yes! We're fully mobile and bring everything we need so we can detail your vehicle anywhere in Calgary." },
  { q: "Do you require a deposit?", a: "No deposit is required upon booking, but a late cancelation fee of 25% may apply." },
  { q: "When do I pay?", a: "Once the service is complete and you are satisfied!" },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container max-w-3xl">
        <ScrollReveal>
          <h2 className="font-heading font-black text-3xl md:text-4xl uppercase text-center text-foreground mb-12">
            FAQ
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-background rounded-lg border border-border px-6">
                <AccordionTrigger className="font-heading font-semibold text-foreground text-left hover:no-underline hover:text-primary py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FAQSection;
