import { Zap, MapPin, Handshake } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
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
          {/* Why Choose Xpress */}
          <div className="space-y-6">
            <h3 className="font-heading font-black text-2xl md:text-3xl uppercase text-primary-foreground">
              Why Choose <span className="text-primary-foreground/70">Xpress</span>?
            </h3>
            <p className="text-primary-foreground/80 max-w-xl">
              From certified professionals and eco-friendly products to our 100% satisfaction guarantee — discover what sets us apart.
            </p>
            <Link to="/why-choose-us" className="inline-block border-2 border-primary-foreground text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-3 rounded text-sm hover:bg-primary-foreground/10 transition-colors">
              Learn More
            </Link>
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