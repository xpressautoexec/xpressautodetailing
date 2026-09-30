import { Link } from "react-router-dom";
import { Phone, Mail, Clock } from "lucide-react";
import { FOOTER_SERVICES, FOOTER_COMPANY, NAP } from "@/data/copy";

const Footer = () => (
  <footer className="bg-brand-dark border-t border-white/10 pt-14 pb-24 lg:pb-10">
    <div className="container">
      <div className="grid gap-10 md:grid-cols-4">
        <div>
          <Link to="/" aria-label="Xpress Auto & RV Detailing home">
            <img
              src="/xpress-logo-white.png"
              alt="Xpress Auto & RV Detailing"
              className="h-12 w-auto object-contain"
              loading="lazy"
            />
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-brand-gray">
            Mobile auto, RV and marine detailing. Our vans carry their own water and power, so we work
            wherever your vehicle sits.
          </p>
          <p className="mt-4 text-sm text-brand-gray">
            Serving {NAP.areas.join(", ")}.
          </p>
        </div>

        <nav aria-label="Services">
          <h2 className="font-heading text-sm font-semibold text-primary-foreground">Services</h2>
          <ul className="mt-4 space-y-2">
            {FOOTER_SERVICES.map((l) => (
              <li key={l.href + l.label}>
                <Link to={l.href} className="text-sm text-brand-gray hover:text-primary transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className="font-heading text-sm font-semibold text-primary-foreground">Company</h2>
          <ul className="mt-4 space-y-2">
            {FOOTER_COMPANY.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="text-sm text-brand-gray hover:text-primary transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/why-choose-us" className="text-sm text-brand-gray hover:text-primary transition-colors">
                Why Choose Us
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="font-heading text-sm font-semibold text-primary-foreground">Contact</h2>
          <ul className="mt-4 space-y-3">
            <li>
              <a href={NAP.phoneHref} className="flex items-center gap-2 text-sm text-brand-gray hover:text-primary transition-colors">
                <Phone className="w-4 h-4" aria-hidden="true" /> {NAP.phone}
              </a>
            </li>
            <li>
              <a href={NAP.emailHref} className="flex items-center gap-2 text-sm text-brand-gray hover:text-primary transition-colors">
                <Mail className="w-4 h-4" aria-hidden="true" /> {NAP.email}
              </a>
            </li>
            <li className="flex items-start gap-2 text-sm text-brand-gray">
              <Clock className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" /> {NAP.hours}
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-brand-gray">
          © {new Date().getFullYear()} {NAP.name}. All rights reserved.
        </p>
        <Link to="/terms-of-service" className="text-xs text-brand-gray hover:text-primary transition-colors">
          Terms of Service
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
