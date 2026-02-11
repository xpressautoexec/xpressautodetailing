import { useState } from "react";
import { Phone, X, MessageCircle, Mail } from "lucide-react";

const FloatingContact = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-[5.5rem] lg:bottom-6 right-3 sm:right-4 z-50 flex flex-col items-end gap-2 sm:gap-3">
      {open && (
        <div className="flex flex-col gap-2 animate-in slide-in-from-bottom-4 fade-in duration-200">
          <a
            href="tel:5875004523"
            className="flex items-center gap-2 bg-brand-dark text-primary-foreground font-heading font-bold text-xs uppercase tracking-wider px-4 py-3 rounded-full shadow-lg hover:bg-brand-dark-surface transition-colors"
          >
            <Phone className="w-4 h-4 text-primary" />
            587-500-4523
          </a>
          <a
            href="sms:5875004523"
            className="flex items-center gap-2 bg-brand-dark text-primary-foreground font-heading font-bold text-xs uppercase tracking-wider px-4 py-3 rounded-full shadow-lg hover:bg-brand-dark-surface transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-primary" />
            Text Us
          </a>
          <a
            href="mailto:support@xpressautodetail.ca"
            className="flex items-center gap-2 bg-brand-dark text-primary-foreground font-heading font-bold text-xs uppercase tracking-wider px-4 py-3 rounded-full shadow-lg hover:bg-brand-dark-surface transition-colors"
          >
            <Mail className="w-4 h-4 text-primary" />
            Email
          </a>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center hover:bg-brand-blue-deep transition-all hover:scale-110"
        aria-label={open ? "Close contact options" : "Contact us"}
      >
        {open ? <X className="w-6 h-6" /> : <Phone className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default FloatingContact;
