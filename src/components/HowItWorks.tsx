import { Monitor, ShieldCheck, MapPin, MessageSquare } from "lucide-react";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const steps = [
  { icon: Monitor, title: "BOOK ONLINE, FAST & EASY!" },
  { icon: ShieldCheck, title: "JOB DONE RIGHT OR IT'S FREE" },
  { icon: MapPin, title: "WE COME TO YOU - ON TIME AND READY" },
  { icon: MessageSquare, title: "GIVE US YOUR FEEDBACK" },
];

const HowItWorks = () => {
  return (
    <section className="bg-primary py-16">
      <div className="container">
        <p className="text-center text-primary-foreground font-heading font-bold uppercase tracking-wider mb-2 text-sm">
          Get your vehicle cleaned
        </p>
        <h2 className="text-center text-primary-foreground font-heading font-black text-3xl md:text-4xl uppercase mb-12">
          Without lifting a finger
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {steps.map((step) => (
            <div key={step.title} className="flex flex-col items-center text-center gap-4">
              <div className="w-20 h-20 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <step.icon className="w-10 h-10 text-primary-foreground" />
              </div>
              <h3 className="font-heading font-bold text-sm uppercase text-primary-foreground tracking-wider">
                {step.title}
              </h3>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary-foreground text-primary font-heading font-bold uppercase tracking-wider px-8 py-3 rounded text-sm hover:bg-primary-foreground/90 transition-colors"
          >
            Book Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
