import { Link } from "react-router-dom";
import { Phone, Mail, Clock, MapPin, ArrowUpRight } from "lucide-react";
import { FOOTER_SERVICES, FOOTER_COMPANY, NAP, SERVICE_AREA_SENTENCE, SHOP } from "@/data/copy";
import MobileQuoteBar from "@/components/MobileQuoteBar";

const heading = "font-heading text-sm font-bold uppercase italic tracking-label text-ink";
const link = "text-sm text-ink-2 transition-colors hover:text-electric";

/** White footer with a charcoal base strip. Also mounts the mobile quote bar, so every page gets it. */
const Footer = () => (
  <>
    <footer className="border-t border-line bg-surface">
      <div className="shell pb-12 pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr_0.85fr_1.25fr] lg:gap-10">
          <div>
            <Link to="/" aria-label="Xpress Auto & RV Detailing home">
              <img
                src="/xpress-logo-dark.png"
                alt="Xpress Auto & RV Detailing"
                width={476}
                height={175}
                className="h-12 w-auto object-contain"
                loading="lazy"
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-2">
              Mobile auto, RV and marine detailing. Our vans carry their own water and power, so we work wherever your
              vehicle sits.
            </p>
            <p className="mt-4 max-w-xs text-sm text-muted-ink">Serving {SERVICE_AREA_SENTENCE}.</p>
            <ul className="mt-6 space-y-3">
              <li>
                <a href={NAP.phoneHref} className="flex items-center gap-2 text-sm font-semibold text-ink hover:text-electric">
                  <Phone className="h-4 w-4 text-electric" aria-hidden="true" /> {NAP.phone}
                </a>
              </li>
              <li>
                <a href={NAP.emailHref} className={`flex items-center gap-2 ${link}`}>
                  <Mail className="h-4 w-4 text-electric" aria-hidden="true" /> {NAP.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-ink-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-electric" aria-hidden="true" /> {NAP.hours}
              </li>
            </ul>
          </div>

          <nav aria-label="Services">
            <h2 className={heading}>Services</h2>
            <ul className="mt-5 space-y-2.5">
              {FOOTER_SERVICES.map((l) => (
                <li key={l.href + l.label}>
                  <Link to={l.href} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className={heading}>Company</h2>
            <ul className="mt-5 space-y-2.5">
              {FOOTER_COMPANY.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={heading}>Airdrie shop</h2>
            <address className="mt-5 flex items-start gap-2 text-sm not-italic leading-relaxed text-ink-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
              <span>
                {SHOP.street}
                <br />
                {SHOP.city}, {SHOP.region} {SHOP.postal}
              </span>
            </address>
            <p className="mt-2 pl-6 text-sm text-muted-ink">Heated shop. Drop-offs welcome.</p>
            <div className="mt-5 overflow-hidden rounded-card border border-line bg-tint">
              <iframe
                title={`Map to ${SHOP.full}`}
                src={SHOP.embedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block aspect-[16/10] w-full border-0 grayscale-[35%]"
              />
            </div>
            <a
              href={SHOP.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-electric hover:underline hover:underline-offset-4"
            >
              Get directions
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="bg-charcoal">
        <div className="shell flex flex-col items-center justify-between gap-3 pb-[calc(var(--mobile-bar-h)+1.5rem+env(safe-area-inset-bottom))] pt-6 sm:flex-row lg:pb-6">
          <p className="text-xs text-primary-foreground/60">
            © {new Date().getFullYear()} {NAP.name}. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link to="/terms-of-service" className="text-xs text-primary-foreground/60 transition-colors hover:text-primary-foreground">
              Terms of service
            </Link>
            <Link to="/cancellation-policy" className="text-xs text-primary-foreground/60 transition-colors hover:text-primary-foreground">
              Cancellation policy
            </Link>
            <Link to="/privacy-policy" className="text-xs text-primary-foreground/60 transition-colors hover:text-primary-foreground">
              Privacy policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
    <MobileQuoteBar />
  </>
);

export default Footer;
