import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import {
  FINDER_SERVICES,
  FINDER_VEHICLES,
  QUESTIONS,
  isComplete,
  recommend,
  servicesFor,
  type Answers,
  type FinderService,
  type FinderVehicle,
} from "@/data/finder";
import { saveFinderPick } from "@/lib/finderHandoff";
import { trackEvent } from "@/lib/tracking";
import { isHubBookUrl } from "@/data/pricing";
import { useHubBooking } from "@/lib/hubBooking";
import { Button } from "@/components/ui/button";

const chip = (on: boolean) =>
  `inline-flex min-h-[44px] items-center gap-2 rounded-full border-2 px-4 text-left text-sm font-semibold transition-colors ${
    on ? "border-electric bg-electric-soft text-ink" : "border-line bg-surface text-ink hover:border-ink-2"
  }`;

const Step = ({ n, title, children }: { n: number; title: string; children: React.ReactNode }) => {
  const id = `finder-step-${n}`;
  return (
    <div role="group" aria-labelledby={id} className="border-t border-line pt-5 first:border-t-0 first:pt-0">
      <p id={id} className="flex items-baseline gap-2.5 font-heading text-lg font-bold leading-snug text-ink">
        <span className="num text-base text-primary">{String(n).padStart(2, "0")}</span>
        {title}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">{children}</div>
    </div>
  );
};

/**
 * Home page "See your price" box: vehicle, service, then questions for that service.
 * "See price & package" opens the recommended package on its service page (highlighted) and
 * hands the pick to the booking assistant, which then only asks timing before offering WEB5.
 */
const PackageFinder = () => {
  const { open: openHubBooking } = useHubBooking();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<FinderVehicle | null>(null);
  const [service, setService] = useState<FinderService | null>(null);
  const [answers, setAnswers] = useState<Answers>({});

  const services = vehicle ? servicesFor(vehicle) : FINDER_SERVICES.filter((s) => !s.rv);
  const ready = !!vehicle && !!service && isComplete(service, answers);
  const rec = useMemo(
    () => (ready ? recommend(vehicle!, service!, answers) : null),
    [ready, vehicle, service, answers],
  );

  const pickVehicle = (v: FinderVehicle) => {
    setVehicle(v);
    const allowed = servicesFor(v).map((s) => s.id);
    if (v === "rv") {
      setService("rv");
      setAnswers({ length: 25 });
    } else if (service && !allowed.includes(service)) {
      setService(null);
      setAnswers({});
    }
  };
  const pickService = (s: FinderService) => {
    setService(s);
    setAnswers(s === "rv" ? { length: 25 } : {});
  };
  const toggle = (qid: string, oid: string, multi: boolean) =>
    setAnswers((a) => {
      if (!multi) return { ...a, [qid]: oid };
      const cur = Array.isArray(a[qid]) ? (a[qid] as string[]) : [];
      return { ...a, [qid]: cur.includes(oid) ? cur.filter((x) => x !== oid) : [...cur, oid] };
    });

  const go = () => {
    if (!rec || !vehicle) return;
    saveFinderPick(vehicle, rec);
    trackEvent("finder_result", { service: rec.service, pkg: rec.pkgId, vehicle });
    navigate(rec.page);
  };

  const questions = service ? QUESTIONS[service] : [];

  return (
    <section id="price" className="scroll-mt-24 border-y border-line bg-tint py-14 sm:py-20">
      <div className="shell grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
        <div>
          <p className="eyebrow">Pick your package</p>
          <h2 className="mt-3 font-heading text-4xl font-extrabold leading-[1.0] tracking-display text-ink sm:text-5xl">
            See your price now
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-2">
            Tell us what you drive and what it needs. We match you to the right package with the price for your vehicle,
            and you can book it online.
          </p>
        </div>

        <div className="rounded-card border border-line bg-surface p-5 sm:p-8">
          <div className="space-y-6">
            <Step n={1} title="What do you drive?">
              {FINDER_VEHICLES.map((v) => (
                <button key={v.id} type="button" aria-pressed={vehicle === v.id} className={chip(vehicle === v.id)} onClick={() => pickVehicle(v.id)}>
                  {v.label}
                </button>
              ))}
            </Step>

            {vehicle && vehicle !== "rv" && (
              <Step n={2} title="What are you interested in?">
                {services.map((s) => (
                  <button key={s.id} type="button" aria-pressed={service === s.id} className={chip(service === s.id)} onClick={() => pickService(s.id)}>
                    {s.label}
                  </button>
                ))}
              </Step>
            )}

            {vehicle &&
              service &&
              questions.map((q, i) => (
                <Step key={`${service}-${q.id}`} n={(vehicle === "rv" ? 2 : 3) + i} title={q.label}>
                  {q.kind === "number" ? (
                    <label className="flex w-full items-center gap-4">
                      <input
                        type="range"
                        min={q.min}
                        max={q.max}
                        value={typeof answers[q.id] === "number" ? (answers[q.id] as number) : q.min}
                        onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: Number(e.target.value) }))}
                        className="w-full accent-electric"
                        aria-label={q.label}
                      />
                      <span className="num w-16 shrink-0 text-right text-xl text-ink">
                        {answers[q.id] as number} {q.unit}
                      </span>
                    </label>
                  ) : (
                    q.options!.map((o) => {
                      const v = answers[q.id];
                      const on = Array.isArray(v) ? v.includes(o.id) : v === o.id;
                      return (
                        <button
                          key={o.id}
                          type="button"
                          aria-pressed={on}
                          className={chip(on)}
                          onClick={() => toggle(q.id, o.id, q.kind === "multi")}
                        >
                          {q.kind === "multi" && (
                            <span
                              aria-hidden="true"
                              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border-2 ${on ? "border-electric bg-electric" : "border-line"}`}
                            >
                              {on && <Check className="h-3 w-3 text-primary-foreground" />}
                            </span>
                          )}
                          {o.label}
                        </button>
                      );
                    })
                  )}
                </Step>
              ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div aria-live="polite" className="min-h-[2.75rem]">
              {rec ? (
                <>
                  <p className="text-xs font-semibold uppercase tracking-label text-muted-ink">Recommended</p>
                  <p className="font-heading text-lg font-bold leading-tight text-ink">
                    {rec.name} <span className="num text-electric">{rec.price}</span>
                  </p>
                </>
              ) : (
                <p className="text-sm text-muted-ink">Answer the questions to see your package and price.</p>
              )}
            </div>
            {rec && isHubBookUrl(rec.book) ? (
              <Button asChild className="min-h-[52px] rounded-full bg-action px-7 text-[15px] font-semibold text-primary-foreground hover:bg-ink">
                <a href={rec.book} onClick={(event) => {
                  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
                  event.preventDefault();
                  if (vehicle) {
                    saveFinderPick(vehicle, rec);
                    trackEvent("finder_result", { service: rec.service, pkg: rec.pkgId, vehicle });
                  }
                  openHubBooking(rec.book);
                }}>
                  See price &amp; package
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            ) : <button
              type="button"
              disabled={!rec}
              onClick={go}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-action px-7 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-40"
            >
              See price &amp; package
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackageFinder;
