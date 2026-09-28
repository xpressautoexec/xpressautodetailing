import { Link } from "react-router-dom";
import { ArrowRight, Check, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WORK_TRUCK_PACKAGES, money, PHONE } from "@/data/pricing";
import truckImage from "@/assets/fleet-kls-truck.jpg";

const WorkTruckSection = () => (
  <section id="work-trucks" className="scroll-mt-24 bg-background py-16 sm:py-24">
    <div className="container px-5 sm:px-8">
      <div className="grid items-center gap-9 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase text-primary"><Truck className="h-4 w-4" /> For the vehicles that put in the hours</p>
          <h2 className="max-w-xl font-heading text-2xl font-black uppercase leading-tight text-foreground sm:text-4xl">A clean start for your work truck.</h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">Built for pickups and trucks working in landscaping, construction and the trades. We come to your yard or job site and tackle the dirt that comes with the job.</p>
          <img src={truckImage} alt="Work truck at a Calgary job site ready for on-site detailing" loading="lazy" className="mt-7 aspect-[16/9] w-full rounded-md object-cover" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {WORK_TRUCK_PACKAGES.map((p) => (
            <article key={p.id} className="flex flex-col rounded-md border border-border bg-card p-6">
              <h3 className="font-heading text-lg font-bold text-foreground">{p.name}</h3>
              <p className="mt-3 font-heading text-3xl font-black text-primary">{money(p.price)}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {p.includes.map((item) => <li key={item} className="flex gap-2 text-sm leading-snug text-muted-foreground"><Check className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />{item}</li>)}
              </ul>
              <Button asChild className="mt-7 w-full font-bold"><a href={`tel:${PHONE.replace(/-/g, "")}`}>Call to book <ArrowRight /></a></Button>
            </article>
          ))}
        </div>
      </div>
      <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-7 text-center sm:flex-row sm:text-left">
        <p className="text-sm font-semibold text-foreground">Have a fleet? Save up to 50% with our fleet detailing packages.</p>
        <Button asChild variant="outline"><Link to="/fleet#quote">Ask about fleet pricing <ArrowRight /></Link></Button>
      </div>
    </div>
  </section>
);

export default WorkTruckSection;