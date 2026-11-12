import { ArrowRight, MessageSquareText } from "lucide-react";
import QuoteLink, { SMS_HREF } from "@/components/site/QuoteLink";
import heroImg from "@/assets/jobs/card-pass-audi-rs5.webp";

/** LLumar "See LLumar in a new light" hero: giant stacked headline left, shaped photo right. */
const HomeHero = () => (
  <section className="relative isolate overflow-hidden bg-canvas">
    <div className="flex flex-col lg:grid lg:min-h-[720px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center">
      <div className="relative w-full pl-6 pt-4 lg:order-2 lg:h-full lg:py-12 lg:pl-0">
        <div className="slanted-photo relative aspect-[16/12] w-full bg-tint lg:aspect-auto lg:h-full lg:min-h-[620px]">
          <img
            src={heroImg}
            alt="Audi RS5 after a ceramic coating by Xpress in Calgary"
            {...{ fetchpriority: "high" }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="hero-copy flex flex-col justify-center pb-14 pt-10 sm:pb-20 lg:order-1 lg:py-20 lg:pr-12">
        <h1 className="llumar-hero-title">
          Mobile
          <br />
          detailing &amp;
          <br />
          protection
          <br />
          in Calgary
        </h1>
        <p className="mt-10 max-w-[32rem] text-lg leading-relaxed text-ink-2">
          Ceramic coating, SunTek® and LLumar® paint protection film, window tint and full detailing for cars, RVs and fleets — mobile across
          Calgary or in our heated Airdrie shop.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <QuoteLink className="pill-action min-h-[56px] gap-2 rounded-full bg-action px-9 text-[15px] text-primary-foreground transition-colors hover:bg-ink">
            Get a quote
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </QuoteLink>
          <a
            href={SMS_HREF}
            className="pill-action min-h-[56px] gap-2 rounded-full border-2 border-ink/15 text-[15px] text-ink transition-colors hover:border-ink"
          >
            <MessageSquareText className="h-4 w-4 text-action" aria-hidden="true" />
            Text us photos
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default HomeHero;
