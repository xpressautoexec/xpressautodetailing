import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { trackLead } from "@/lib/metaPixel";
import { useToast } from "@/hooks/use-toast";
import { NAP } from "@/data/copy";
import { btnPrimary, cardClass } from "@/components/site/Section";

const input =
  "mt-1.5 h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none focus:border-electric focus:ring-2 focus:ring-electric/20";

/** Fleet, dealership and rental fleet quote request. */
const FleetQuoteForm = ({ title = "Your fleet", subtitle = "Per-unit pricing for work trucks, dealership lots and rental fleets." }: { title?: string; subtitle?: string }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", units: "", details: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.company.trim() || !form.email.trim()) {
      toast({ title: "Name, company and email are required", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: form.name.trim(),
      company_name: form.company.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      message: [form.units && `Units: ${form.units}`, form.details].filter(Boolean).join("\n") || "Fleet quote request",
      form_type: "fleet",
    });
    setLoading(false);
    if (error) {
      toast({ title: `That didn't send. Please call or text ${NAP.phone}.`, variant: "destructive" });
      return;
    }
    trackLead("fleet");
    setDone(true);
  };

  if (done) {
    return (
      <div className={`${cardClass} p-8`}>
        <p className="font-heading text-xl font-semibold text-ink">Request received</p>
        <p className="mt-2 text-[15px] text-ink-2">We'll be in touch within one business day to book a yard walk.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={`${cardClass} p-6 sm:p-8`}>
      <h3 className="font-heading text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-1 text-sm text-muted-ink">{subtitle}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink-2">
          Name
          <input required value={form.name} onChange={set("name")} className={input} />
        </label>
        <label className="block text-sm font-medium text-ink-2">
          Company
          <input required value={form.company} onChange={set("company")} className={input} />
        </label>
        <label className="block text-sm font-medium text-ink-2">
          Email
          <input type="email" required value={form.email} onChange={set("email")} className={input} />
        </label>
        <label className="block text-sm font-medium text-ink-2">
          Phone <span className="text-muted-ink">(optional)</span>
          <input type="tel" value={form.phone} onChange={set("phone")} className={input} />
        </label>
        <label className="block text-sm font-medium text-ink-2 sm:col-span-2">
          How many units?
          <input placeholder="12 service trucks, 40 rental RVs…" value={form.units} onChange={set("units")} className={input} />
        </label>
        <label className="block text-sm font-medium text-ink-2 sm:col-span-2">
          What do you need, and how often?
          <textarea rows={3} value={form.details} onChange={set("details")} className={`${input} h-auto py-2.5`} />
        </label>
      </div>
      <button type="submit" disabled={loading} className={`${btnPrimary} mt-6 w-full disabled:opacity-60`}>
        {loading ? "Sending…" : "Request a fleet quote"}
      </button>
    </form>
  );
};

export default FleetQuoteForm;
