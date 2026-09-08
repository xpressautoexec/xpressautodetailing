import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

/** Fleet / dealership quote request. */
const FleetQuoteForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    units: "",
    details: "",
  });

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
      toast({ title: "Something went wrong. Please call us instead.", variant: "destructive" });
      return;
    }
    setDone(true);
  };

  if (done) {
    return (
      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
        <p className="font-heading text-lg font-bold text-foreground">
          Thanks. We'll be in touch within one business day with a fleet quote.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <h3 className="font-heading text-xl font-bold text-foreground">Request a fleet quote</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Per-unit pricing for work trucks, dealership lots and rental fleets.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="fq-name" className="text-sm font-medium text-foreground">Name</label>
          <input id="fq-name" required value={form.name} onChange={set("name")}
            className="mt-1 h-11 w-full rounded-lg border border-input bg-background px-3 text-foreground" />
        </div>
        <div>
          <label htmlFor="fq-company" className="text-sm font-medium text-foreground">Company</label>
          <input id="fq-company" required value={form.company} onChange={set("company")}
            className="mt-1 h-11 w-full rounded-lg border border-input bg-background px-3 text-foreground" />
        </div>
        <div>
          <label htmlFor="fq-email" className="text-sm font-medium text-foreground">Email</label>
          <input id="fq-email" type="email" required value={form.email} onChange={set("email")}
            className="mt-1 h-11 w-full rounded-lg border border-input bg-background px-3 text-foreground" />
        </div>
        <div>
          <label htmlFor="fq-phone" className="text-sm font-medium text-foreground">Phone</label>
          <input id="fq-phone" type="tel" value={form.phone} onChange={set("phone")}
            className="mt-1 h-11 w-full rounded-lg border border-input bg-background px-3 text-foreground" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="fq-units" className="text-sm font-medium text-foreground">How many units?</label>
          <input id="fq-units" placeholder="12 service trucks, 40 rental RVs…" value={form.units} onChange={set("units")}
            className="mt-1 h-11 w-full rounded-lg border border-input bg-background px-3 text-foreground" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="fq-details" className="text-sm font-medium text-foreground">What do you need, and how often?</label>
          <textarea id="fq-details" rows={3} value={form.details} onChange={set("details")}
            className="mt-1 w-full rounded-lg border border-input bg-background p-3 text-foreground" />
        </div>
      </div>

      <button type="submit" disabled={loading}
        className="mt-6 min-h-[44px] w-full rounded-full bg-primary px-6 font-semibold text-primary-foreground disabled:opacity-60">
        {loading ? "Sending…" : "Get my fleet quote"}
      </button>
    </form>
  );
};

export default FleetQuoteForm;
