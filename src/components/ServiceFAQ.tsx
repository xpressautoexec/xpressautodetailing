import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ScrollReveal from "@/components/ScrollReveal";

interface FAQ {
  q: string;
  a: string;
}

const ServiceFAQ = ({ title, faqs }: { title: string; faqs: FAQ[] }) => (
  <section className="py-16 bg-muted/30">
    <div className="container max-w-3xl">
      <ScrollReveal>
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground text-center mb-12">
          {title}
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-background rounded-lg border border-border px-6"
            >
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

export default ServiceFAQ;
