import { MessageSquareText, Phone } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import { SMS_HREF, TEL_HREF } from "@/components/site/QuoteLink";
import { NAP } from "@/data/copy";

const STEPS = [
  { title: `Call ${NAP.phone}`, body: "Tell us the vehicle and what it needs. Or fill in the form and we'll call you back." },
  { title: "Add photos if you have them", body: "Optional. A few shots of the worst spots help us quote it exactly." },
  { title: "Get your price", body: "A real number for your vehicle, not a range, usually the same day." },
];

/** Charcoal band: call first, form or photos as options. Holds the homepage quote form. */
const PhotoQuoteBand = () => (
  <section id="quote" className="scroll-mt-24 bg-charcoal section-y">
    <div className="shell grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
      <div>
        <p className="eyebrow mb-3 text-[hsl(224_90%_75%)]">Get a quote</p>
        <h2 className="font-heading text-4xl font-extrabold leading-[1.0] tracking-display text-primary-foreground sm:text-6xl">
          Talk to us, get an exact price
        </h2>
        <ol className="mt-10 space-y-7">
          {STEPS.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[2.75rem_1fr] gap-x-4">
              <span className="num flex h-11 w-11 items-center justify-center rounded-full border border-primary-foreground/25 text-xl text-primary-foreground">
                {i + 1}
              </span>
              <div>
                <p className="font-heading text-2xl font-bold text-primary-foreground">{s.title}</p>
                <p className="mt-1 text-[15px] leading-relaxed text-primary-foreground/65">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <a
            href={TEL_HREF}
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-primary-foreground px-7 text-[15px] font-semibold text-ink transition-colors hover:bg-primary-foreground/90"
          >
            <Phone className="h-4 w-4 text-action" aria-hidden="true" />
            Call {NAP.phone}
          </a>
          <a
            href={SMS_HREF}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground/75 underline decoration-primary-foreground/25 decoration-2 underline-offset-[6px] hover:text-primary-foreground"
          >
            <MessageSquareText className="h-4 w-4" aria-hidden="true" />
            Or text us photos
          </a>
        </div>
      </div>
      <QuoteForm source="home-photo-quote" title="Or send the details here" />
    </div>
  </section>
);

export default PhotoQuoteBand;
