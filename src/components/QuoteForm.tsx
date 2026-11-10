import { useState } from "react";
import { MessageSquareText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { trackLead } from "@/lib/tracking";
import { NAP } from "@/data/copy";
import { SMS_HREF } from "@/components/site/QuoteLink";

const SERVICES = [
  "Car or truck detailing",
  "Ceramic, PPF or paint correction",
  "RV or trailer",
  "Fleet or dealership",
  "Something else",
] as const;

const input =
  "mt-1.5 h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none transition-colors focus:border-electric focus:ring-2 focus:ring-electric/20";

/**
 * Quote request: phone first, the vehicle, the service. Photos go by text, so the form
 * keeps a one-tap "text photos instead" route. Marked `data-quote-form` for the quote links
 * and the mobile bar.
 */
const QuoteForm = ({ source = "quote", title = "Get a quote" }: { source?: string; title?: string }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", vehicle: "", service: "", notes: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast({ title: "Add your name and a phone number we can text.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: form.name.trim(),
      email: "not-provided@xpressautodetail.ca",
      phone: form.phone.trim(),
      message:
        [
          form.service && `Service: ${form.service}`,
          form.vehicle && `Vehicle: ${form.vehicle}`,
          form.notes,
        ]
          .filter(Boolean)
          .join("\n") || "Quote request",
      form_type: source,
    });
    setLoading(false);
    if (error) {
      toast({ title: `That didn't send. Please call or text ${NAP.phone}.`, variant: "destructive" });
      return;
    }
    trackLead({ formType: source, phone: form.phone.trim() });
    setDone(true);
  };

  if (done) {
    return (
      <div data-quote-form className="rounded-card border border-line bg-surface p-7 sm:p-8">
        <p className="font-heading text-2xl font-bold text-ink">Got it. Now send the photos.</p>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-2">
          Text three photos (front, side and the worst spot) to {NAP.phone} and we'll reply with a price.
        </p>
        <a
          href={SMS_HREF}
          className="mt-6 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-electric px-6 text-sm font-semibold text-primary-foreground hover:bg-electric-2"
        >
          <MessageSquareText className="h-4 w-4" aria-hidden="true" />
          Text photos now
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} data-quote-form className="rounded-card border border-line bg-surface p-6 sm:p-8">
      <p className="font-heading text-2xl font-bold text-ink">{title}</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink-2">
          Name
          <input required maxLength={100} autoComplete="name" value={form.name} onChange={set("name")} className={input} />
        </label>
        <label className="block text-sm font-medium text-ink-2">
          Mobile number
          <input
            required
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={20}
            value={form.phone}
            onChange={set("phone")}
            className={input}
          />
        </label>
        <label className="block text-sm font-medium text-ink-2 sm:col-span-2">
          Vehicle <span className="text-muted-ink">(year, make, model or RV length)</span>
          <input maxLength={120} value={form.vehicle} onChange={set("vehicle")} className={input} />
        </label>
        <label className="block text-sm font-medium text-ink-2 sm:col-span-2">
          What do you need?
          <select value={form.service} onChange={set("service")} className={`${input} appearance-none`}>
            <option value="">Choose one</option>
            {SERVICES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium text-ink-2 sm:col-span-2">
          Anything we should know? <span className="text-muted-ink">(optional)</span>
          <textarea rows={3} maxLength={1000} value={form.notes} onChange={set("notes")} className={`${input} h-auto py-2.5`} />
        </label>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center rounded-md bg-electric px-6 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-electric-2 disabled:opacity-60"
      >
        {loading ? "Sending…" : "Get my quote"}
      </button>
      <p className="mt-4 text-center text-sm text-muted-ink">
        Rather just send photos?{" "}
        <a href={SMS_HREF} className="font-semibold text-electric hover:underline hover:underline-offset-4">
          Text them to {NAP.phone}
        </a>
      </p>
    </form>
  );
};

export default QuoteForm;
