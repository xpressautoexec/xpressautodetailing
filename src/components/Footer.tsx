import { Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const Footer = () => {
  return (
    <footer className="bg-brand-dark border-t border-brand-dark-surface py-12">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="font-heading font-black text-xl">
              <span className="text-primary">X</span>
              <span className="text-primary-foreground">PRESS</span>
              <span className="text-primary text-xs font-semibold ml-1 tracking-widest">AUTO DETAILING</span>
            </Link>
            <p className="text-brand-gray text-sm mt-3 leading-relaxed">
              Convenient, affordable car detailing that comes to you. Mobile detailing made simple.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-primary-foreground uppercase tracking-wider text-sm mb-4">Services</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Interior Detailing", to: "/interior-detailing" },
                { label: "Exterior Detailing", to: "/exterior-detailing" },
                { label: "Complete Detailing", to: "/complete-detailing" },
                { label: "Trailer & RV", to: "/trailer-rv" },
                { label: "Paint & Ceramics", to: "/paint-ceramics" },
                { label: "Corporate & Fleet", to: "/corporate-fleet" },
              ].map((link) => (
                <Link key={link.label} to={link.to} className="text-brand-gray text-sm hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-primary-foreground uppercase tracking-wider text-sm mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Gift Cards", to: "/gift-cards" },
                { label: "Gallery", to: "/gallery" },
                { label: "Contact Us", to: "/contact" },
                { label: "Blog", to: "/blog" },
              ].map((link) => (
                <Link key={link.label} to={link.to} className="text-brand-gray text-sm hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-primary-foreground uppercase tracking-wider text-sm mb-4">Contact Us</h4>
            <div className="flex flex-col gap-3">
              <a href="tel:5875004523" className="text-brand-gray text-sm hover:text-primary transition-colors flex items-center gap-2">
                <Phone className="w-4 h-4" /> 587-500-4523
              </a>
              <a href="mailto:support@xpressautodetailing.ca" className="text-brand-gray text-sm hover:text-primary transition-colors flex items-center gap-2">
                <Mail className="w-4 h-4" /> support@xpressautodetailing.ca
              </a>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-6 py-2.5 rounded text-sm text-center hover:bg-brand-blue-deep transition-colors w-fit"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-dark-surface pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-brand-gray text-xs">
            © {new Date().getFullYear()} Xpress Auto Detailing. All rights reserved.
          </p>
          <Link to="/terms-conditions" className="text-brand-gray text-xs hover:text-primary transition-colors">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
