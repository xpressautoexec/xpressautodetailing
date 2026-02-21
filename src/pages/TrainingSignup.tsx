import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ScrollReveal from "@/components/ScrollReveal";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, CalendarDays, Clock, Users, MapPin, ArrowLeft, Check, Wrench, Search, Gem, Shield } from "lucide-react";

const courseIcons: Record<string, React.ReactNode> = {
  wrench: <Wrench className="w-6 h-6 text-primary" />,
  search: <Search className="w-6 h-6 text-primary" />,
  gem: <Gem className="w-6 h-6 text-primary" />,
  shield: <Shield className="w-6 h-6 text-primary" />,
};

const COURSES = [
  {
    id: "detailing-fundamentals",
    name: "Detailing Fundamentals",
    icon: "wrench",
    price: "$349",
    duration: "2 days (16 hours)",
    dates: [
      { start: "Mar 15–16, 2026", spotsLeft: 3 },
      { start: "Apr 12–13, 2026", spotsLeft: 5 },
      { start: "May 10–11, 2026", spotsLeft: 6 },
    ],
  },
  {
    id: "paint-correction",
    name: "Paint Correction Mastery",
    icon: "search",
    price: "$549",
    duration: "3 days (24 hours)",
    dates: [
      { start: "Mar 22–24, 2026", spotsLeft: 2 },
      { start: "Apr 19–21, 2026", spotsLeft: 4 },
      { start: "May 17–19, 2026", spotsLeft: 6 },
    ],
  },
  {
    id: "ceramic-coating",
    name: "Ceramic Coating Certification",
    icon: "gem",
    price: "$699",
    duration: "3 days (24 hours)",
    dates: [
      { start: "Mar 29–31, 2026", spotsLeft: 1 },
      { start: "Apr 26–28, 2026", spotsLeft: 4 },
      { start: "Jun 7–9, 2026", spotsLeft: 6 },
    ],
  },
  {
    id: "ppf-installation",
    name: "PPF Installation",
    icon: "shield",
    price: "$899",
    duration: "5 days (40 hours)",
    dates: [
      { start: "Apr 5–9, 2026", spotsLeft: 2 },
      { start: "May 3–7, 2026", spotsLeft: 5 },
      { start: "Jun 14–18, 2026", spotsLeft: 6 },
    ],
  },
];

const TrainingSignup = () => {
  const [searchParams] = useSearchParams();
  const preselected = searchParams.get("course") || "";
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState(preselected);
  const [selectedDate, setSelectedDate] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", experience: "" });

  const course = useMemo(() => COURSES.find((c) => c.id === selectedCourse), [selectedCourse]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse || !selectedDate || !form.name.trim() || !form.email.trim()) {
      toast({ title: "Please fill in all required fields and select a date.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      message: `Training signup — Course: ${course?.name || selectedCourse} | Date: ${selectedDate} | Experience: ${form.experience || "Not specified"}`,
      form_type: "training",
    });
    setLoading(false);
    if (error) {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
    } else {
      toast({ title: "You're signed up! We'll send confirmation details to your email shortly." });
      setForm({ name: "", email: "", phone: "", experience: "" });
      setSelectedDate("");
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen">
        <SEO
          title="Sign Up for Detailing Training — Xpress Auto Detailing"
          description="Register for upcoming detailing, ceramic coating, paint correction & PPF training classes in Calgary. Small classes, hands-on learning."
          canonical="/training/signup"
        />
        <Navbar />

        {/* Hero */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container max-w-4xl text-center px-6">
            <Link to="/training" className="inline-flex items-center gap-2 text-primary text-sm font-heading font-bold uppercase tracking-wider mb-6 hover:underline">
              <ArrowLeft className="w-4 h-4" /> Back to Training
            </Link>
            <h1 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-foreground mb-4">
              Reserve Your <span className="text-primary">Training Spot</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose your course, pick a date, and secure your seat. Class sizes are limited to 4–6 students for maximum hands-on learning.
            </p>
          </div>
        </section>

        {/* Course Selection + Form */}
        <section className="py-12 sm:py-16 bg-muted/30">
          <div className="container max-w-5xl px-4 sm:px-6">
            <div className="grid lg:grid-cols-5 gap-10">
              {/* Left: Course + Dates */}
              <div className="lg:col-span-2 space-y-6">
                <ScrollReveal>
                  <h2 className="font-heading font-bold text-lg uppercase text-foreground mb-4">1. Choose Your Course</h2>
                  <div className="space-y-3">
                    {COURSES.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => { setSelectedCourse(c.id); setSelectedDate(""); }}
                        className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                          selectedCourse === c.id
                            ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                            : "border-border bg-background hover:border-primary/30"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span>{courseIcons[c.icon] || c.icon}</span>
                            <div>
                              <p className="font-heading font-bold text-sm uppercase text-foreground">{c.name}</p>
                              <p className="text-xs text-muted-foreground">{c.duration}</p>
                            </div>
                          </div>
                          <span className="font-heading font-black text-lg text-primary">{c.price}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollReveal>

                {course && (
                  <ScrollReveal>
                    <h2 className="font-heading font-bold text-lg uppercase text-foreground mb-4">2. Select a Date</h2>
                    <div className="space-y-2">
                      {course.dates.map((d) => (
                        <button
                          key={d.start}
                          onClick={() => setSelectedDate(d.start)}
                          className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                            selectedDate === d.start
                              ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                              : "border-border bg-background hover:border-primary/30"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <CalendarDays className="w-5 h-5 text-primary" />
                              <span className="font-heading font-bold text-sm text-foreground">{d.start}</span>
                            </div>
                            <span className={`text-xs font-bold uppercase tracking-wider ${d.spotsLeft <= 2 ? "text-red-400" : "text-muted-foreground"}`}>
                              {d.spotsLeft} spot{d.spotsLeft !== 1 ? "s" : ""} left
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </ScrollReveal>
                )}

                {/* Info */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-muted-foreground text-sm">
                    <MapPin className="w-4 h-4 text-primary shrink-0" /> Calgary facility
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground text-sm">
                    <Clock className="w-4 h-4 text-primary shrink-0" /> 9:00 AM – 5:00 PM daily
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground text-sm">
                    <Users className="w-4 h-4 text-primary shrink-0" /> 4–6 students max
                  </div>
                </div>
              </div>

              {/* Right: Signup Form */}
              <div className="lg:col-span-3">
                <ScrollReveal>
                  <div className="bg-background border border-border rounded-2xl p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <GraduationCap className="w-6 h-6 text-primary" />
                      <h2 className="font-heading font-bold text-lg uppercase text-foreground">3. Your Details</h2>
                    </div>

                    {course && selectedDate && (
                      <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
                        <p className="text-sm text-muted-foreground">Selected:</p>
                        <p className="font-heading font-bold text-foreground">{course.name} — {course.price}</p>
                        <p className="text-sm text-primary font-semibold">{selectedDate}</p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Full Name *</label>
                        <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-background border border-border text-foreground rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" required maxLength={100} />
                      </div>
                      <div>
                        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Email *</label>
                        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-background border border-border text-foreground rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" required maxLength={255} />
                      </div>
                      <div>
                        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Phone</label>
                        <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-background border border-border text-foreground rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" maxLength={20} />
                      </div>
                      <div>
                        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Detailing Experience</label>
                        <select value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className="w-full bg-background border border-border text-foreground rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                          <option value="">Select your level</option>
                          <option value="none">No experience</option>
                          <option value="hobbyist">Hobbyist / DIY</option>
                          <option value="some-professional">Some professional experience</option>
                          <option value="experienced">Experienced professional</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        disabled={loading || !selectedCourse || !selectedDate}
                        className="w-full bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-6 py-3.5 rounded-lg text-sm hover:bg-brand-blue-deep transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {loading ? "Submitting..." : "Reserve My Spot"}
                        {!loading && <Check className="w-4 h-4" />}
                      </button>

                      <p className="text-xs text-muted-foreground text-center">
                        A $50 deposit is required to confirm your spot. We'll send payment details to your email.
                      </p>
                    </form>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default TrainingSignup;
