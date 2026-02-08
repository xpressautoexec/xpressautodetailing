import { Zap, MapPin, Handshake } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import appShowcase from "@/assets/app-showcase.png";
const BOOKING_URL = "https://xpressauto.fieldd.co/";
const features = [{
  icon: Zap,
  title: "Book Instantly",
  desc: "No more quotes"
}, {
  icon: MapPin,
  title: "Skip the Carwash",
  desc: "We come to you"
}, {
  icon: Handshake,
  title: "Reliable Service",
  desc: "99.6% bookings fulfilled"
}];
const AppShowcase = () => <section className="bg-primary py-20 relative overflow-hidden">
    <div className="container">
      <ScrollReveal>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Phone mockup image */}
          <div className="flex justify-center">
            <img alt="Xpress Auto Detailing mobile booking app showing map and scheduling interface" className="max-w-full h-auto max-h-[400px] drop-shadow-2xl object-cover" src="/lovable-uploads/b9d4bef8-ad62-42e7-abd4-8f3928337447.png" />
          </div>

          {/* Text content */}
          <div className="text-center lg:text-left">
            <h2 className="font-heading font-black text-3xl md:text-4xl uppercase text-primary-foreground mb-2">
              Xpress Isn't Just a Name
            </h2>
            <p className="font-heading font-bold text-xl md:text-2xl uppercase text-primary-foreground/80 mb-10">
              It's How We Move
            </p>

            <div className="space-y-8 mb-10">
              {features.map(f => <div key={f.title} className="flex items-center gap-4 justify-center lg:justify-start">
                  <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0">
                    <f.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="text-left">
                    <p className="font-heading font-bold text-primary-foreground uppercase tracking-wider text-sm">
                      {f.title}
                    </p>
                    <p className="text-primary-foreground/70 text-sm">{f.desc}</p>
                  </div>
                </div>)}
            </div>

            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-block border-2 border-primary-foreground text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-3 rounded text-sm hover:bg-primary-foreground/10 transition-colors">
              Book Now
            </a>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>;
export default AppShowcase;