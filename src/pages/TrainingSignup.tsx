import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Section, btnPrimary, cardClass } from "@/components/site/Section";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { TRAINING, TRAINING_TERMS, money } from "@/data/pricing";
import { NAP } from "@/data/copy";

const TIMING = ["As soon as possible", "Within the next two months", "In three months or more", "I'm flexible"];

const inputClass =
  "mt-1.5 h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none focus:border-electric focus:ring-2 focus:ring-electric/20";

/**
 * Seat request, not a live booking: no fixed dates are published, so nothing goes stale.
 * We confirm a date by email.
 */
const TrainingSignup = () => {
  const [searchParams] = useSearchParams();
  const preselected = TRAINING.some((c) => c.id === searchParams.get("course")) ? searchParams.get("course")! : "";
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [courseId, setCourseId] = useState(preselected);
  const [form, setForm] = useState({ name: "", email: "", phone: "", timing: TIMING[0], experience: "" });

  const course = TRAINING.find((c) => c.id === courseId);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!course || !form.name.trim() || !form.email.trim()) {
      toast({ title: "Choose a course and add your name and email.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      message: `Training seat request: ${course.name} | Timing: ${form.timing} | Experience: ${form.experience || "Not specified"}`,
      form_type: "training",
    });
    setLoading(false);
    if (error) {
      toast({ title: `That didn't send. Please call or text ${NAP.phone}.`, variant: "destructive" });
      return;
    }
    setDone(true);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-canvas">
        <SEO
          title="Request a Training Seat | Xpress Detailing Training"
          description={`Request a seat in a hands-on detailing, paint correction, ceramic coating or PPF course in Calgary. Classes of ${TRAINING_TERMS.classSize}.`}
          canonical="/training/signup"
        />
        <Navbar />
        <AutoBreadcrumbs />

        <section className="border-b border-line bg-surface py-14 sm:py-20">
          <div className="shell">
            <Link to="/training" className="text-sm font-semibold text-electric hover:underline">
              All courses
            </Link>
            <h1 className="mt-4 font-heading text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl">
              Request a training seat
            </h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-2">
              Pick a course and when you'd like to start. We'll email you the next available dates, and a{" "}
              {money(TRAINING_TERMS.deposit)} deposit holds your seat once you choose one.
            </p>
          </div>
        </section>

        <Section>
          {done ? (
            <div className={`${cardClass} max-w-2xl p-8`}>
              <h2 className="font-heading text-2xl font-semibold text-ink">Request received</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
                We'll email {form.email} with the next {course?.name} dates within one business day. Questions in the
                meantime? Call or text {NAP.phone}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
              <fieldset>
                <legend className="font-heading text-xl font-semibold text-ink">Course</legend>
                <div className="mt-4 space-y-3">
                  {TRAINING.map((c) => (
                    <label
                      key={c.id}
                      className={`flex cursor-pointer items-center justify-between gap-4 rounded-[10px] border p-4 transition-colors ${
                        courseId === c.id ? "border-electric bg-electric-soft" : "border-line bg-surface hover:border-ink-2"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="course"
                          value={c.id}
                          checked={courseId === c.id}
                          onChange={() => setCourseId(c.id)}
                          className="accent-electric"
                        />
                        <span>
                          <span className="block font-semibold text-ink">{c.name}</span>
                          <span className="block text-sm text-muted-ink">
                            {c.duration}, {c.hours} hours
                          </span>
                        </span>
                      </span>
                      <span className="font-heading text-lg font-semibold tabular-nums text-ink">{money(c.price)}</span>
                    </label>
                  ))}
                </div>
                <dl className="mt-8 space-y-2 text-sm text-ink-2">
                  <div className="flex justify-between border-b border-line pb-2">
                    <dt className="text-muted-ink">Class size</dt>
                    <dd>{TRAINING_TERMS.classSize}</dd>
                  </div>
                  <div className="flex justify-between border-b border-line pb-2">
                    <dt className="text-muted-ink">Deposit to hold a seat</dt>
                    <dd>{money(TRAINING_TERMS.deposit)}, applied to the course fee</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-ink">Move your seat</dt>
                    <dd>Free with {TRAINING_TERMS.rescheduleDays} days' notice</dd>
                  </div>
                </dl>
              </fieldset>

              <div className={`${cardClass} p-6 sm:p-8`}>
                <h2 className="font-heading text-xl font-semibold text-ink">Your details</h2>
                <div className="mt-5 grid gap-4">
                  <label className="block text-sm font-medium text-ink-2">
                    Full name
                    <input type="text" required maxLength={100} value={form.name} onChange={set("name")} className={inputClass} />
                  </label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-medium text-ink-2">
                      Email
                      <input type="email" required maxLength={255} value={form.email} onChange={set("email")} className={inputClass} />
                    </label>
                    <label className="block text-sm font-medium text-ink-2">
                      Phone <span className="text-muted-ink">(optional)</span>
                      <input type="tel" maxLength={20} value={form.phone} onChange={set("phone")} className={inputClass} />
                    </label>
                  </div>
                  <label className="block text-sm font-medium text-ink-2">
                    When would you like to start?
                    <select value={form.timing} onChange={set("timing")} className={inputClass}>
                      {TIMING.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block text-sm font-medium text-ink-2">
                    Detailing experience
                    <select value={form.experience} onChange={set("experience")} className={inputClass}>
                      <option value="">Choose one</option>
                      <option>No experience</option>
                      <option>Hobbyist or DIY</option>
                      <option>Some professional experience</option>
                      <option>Experienced professional</option>
                    </select>
                  </label>
                </div>
                <button type="submit" disabled={loading || !course} className={`${btnPrimary} mt-7 w-full disabled:opacity-50`}>
                  {loading ? "Sending…" : course ? `Request a seat in ${course.name}` : "Choose a course"}
                </button>
                <p className="mt-3 text-xs leading-relaxed text-muted-ink">
                  No payment now. We'll email dates and deposit details.
                </p>
              </div>
            </form>
          )}
        </Section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default TrainingSignup;
