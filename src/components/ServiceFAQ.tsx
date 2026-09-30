import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FAQ {
  q: string;
  a: string;
}

/** The one FAQ layout used site-wide: heading left, accordion right. */
const ServiceFAQ = ({ title, faqs, id = "faq" }: { title: string; faqs: FAQ[]; id?: string }) => (
  <section id={id} className="scroll-mt-24 border-t border-line bg-canvas py-16 sm:py-24">
    <div className="shell grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
      <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h2>
      <Accordion type="single" collapsible className="border-t border-line">
        {faqs.map((faq) => (
          <AccordionItem key={faq.q} value={faq.q} className="border-line">
            <AccordionTrigger className="py-5 text-left font-heading text-base font-semibold text-ink hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-[15px] leading-relaxed text-ink-2">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default ServiceFAQ;
