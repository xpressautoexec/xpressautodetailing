import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ASSESS_DISCLAIMER, ASSESS_SUCCESS } from "@/data/copy";
import { trackLead } from "@/lib/tracking";

interface Props {
  /** Stored with the submission so we know which page it came from. */
  source?: string;
  title?: string;
  subtitle?: string;
}

/** Free, no-obligation assessment request. One field set, one button. */
const AssessmentForm = ({
  source = "assessment",
  title = "Book a free assessment",
  subtitle = "Tell us what you've got and we'll come look at it — no charge.",
}: Props) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", vehicle: "", notes: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast({ title: "Name and phone number are required", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: form.name.trim(),
      email: form.email.trim() || "not-provided@xpressautodetail.ca",
      phone: form.phone.trim(),
      message: [form.vehicle && `Vehicle: ${form.vehicle}`, form.notes].filter(Boolean).join("\n") || "Assessment request",
      form_type: source,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Something went wrong. Please call us instead.", variant: "destructive" });
      return;
    }
    trackLead({ formType: source, email: form.email.trim(), phone: form.phone.trim() });
    setDone(true);
  };

  if (done) {
    return (
      <div className="rounded-[10px] border border-electric/30 bg-electric-soft p-8 text-center">
        <p className="font-heading text-lg font-semibold text-ink">{ASSESS_SUCCESS}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-[10px] border border-line bg-surface p-6 sm:p-8">
      <h3 className="font-heading text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-1 text-sm text-muted-ink">{subtitle}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="af-name" className="text-sm font-medium text-ink-2">Name</label>
          <input id="af-name" required value={form.name} onChange={set("name")}
            className="mt-1 h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink" />
        </div>
        <div>
          <label htmlFor="af-phone" className="text-sm font-medium text-ink-2">Phone</label>
          <input id="af-phone" type="tel" required value={form.phone} onChange={set("phone")}
            className="mt-1 h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="af-email" className="text-sm font-medium text-ink-2">Email <span className="text-muted-ink">(optional)</span></label>
          <input id="af-email" type="email" value={form.email} onChange={set("email")}
            className="mt-1 h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="af-vehicle" className="text-sm font-medium text-ink-2">What are we looking at?</label>
          <input id="af-vehicle" placeholder="2019 F-150, 32 ft travel trailer, 22 ft pontoon…" value={form.vehicle} onChange={set("vehicle")}
            className="mt-1 h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="af-notes" className="text-sm font-medium text-ink-2">Anything we should know? <span className="text-muted-ink">(optional)</span></label>
          <textarea id="af-notes" rows={3} value={form.notes} onChange={set("notes")}
            className="mt-1 w-full rounded-md border border-line bg-surface p-3 text-sm text-ink" />
        </div>
      </div>

      <button type="submit" disabled={loading}
        className="mt-6 min-h-[44px] w-full rounded-md bg-electric px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-electric-2 disabled:opacity-60">
        {loading ? "Sending…" : "Request my free assessment"}
      </button>
      <p className="mt-3 text-xs text-muted-ink">{ASSESS_DISCLAIMER}</p>
    </form>
  );
};

export default AssessmentForm;
