import { MessageSquareText } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import { SMS_HREF } from "@/components/site/QuoteLink";
import { NAP } from "@/data/copy";

const STEPS = [
  { title: "Take 3 photos", body: "The front, the side, and the worst spot inside or out." },
  { title: `Text them to ${NAP.phone}`, body: "Or fill in the form and we'll text you back for them." },
  { title: "Get a price in 15 minutes", body: "A real number for your vehicle, not a range. Book it or don't." },
];

/** Charcoal band: the fastest route to a price. Holds the homepage quote form. */
const PhotoQuoteBand = () => (
  <section id="quote" className="scroll-mt-24 bg-charcoal section-y">
    <div className="shell grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
      <div>
        <h2 className="font-heading text-4xl font-extrabold leading-[1.0] tracking-display text-primary-foreground sm:text-6xl">
          Text 3 photos, get a price in 15 minutes
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
        <a
          href={SMS_HREF}
          className="mt-10 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-md border border-primary-foreground/30 px-6 text-[15px] font-semibold text-primary-foreground transition-colors hover:border-primary-foreground/70"
        >
          <MessageSquareText className="h-4 w-4" aria-hidden="true" />
          Text us photos
        </a>
      </div>
      <QuoteForm source="home-photo-quote" title="Or send the details here" />
    </div>
  </section>
);

export default PhotoQuoteBand;
