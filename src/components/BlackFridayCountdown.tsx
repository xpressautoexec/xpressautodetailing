import type { blackFridayCountdown } from "@/lib/black-friday";

type Countdown = ReturnType<typeof blackFridayCountdown> | null;
export const BlackFridayCountdown = ({ countdown, large = false }: { countdown: Countdown; large?: boolean }) => (
  <div role="timer" aria-label="Time remaining until the Black Friday sale ends" className={`bf-countdown flex items-center justify-center ${large ? "gap-2 sm:gap-4" : "gap-2"}`}>
    {(["days", "hours", "minutes", "seconds"] as const).map((key, index) => (
      <div key={key} className={large ? "flex items-start gap-2 sm:gap-4" : "flex items-start gap-2 sm:gap-3"}>
        {index > 0 && <span aria-hidden="true" className={large ? "pt-4 text-2xl sm:pt-5 sm:text-4xl" : "text-xs"}>:</span>}
        <div className={large ? "bf-count-tile w-16 rounded-md py-3 text-center sm:w-24 sm:py-4" : "w-8 text-center"}>
          <span className={`block tabular-nums ${large ? "text-4xl font-semibold sm:text-5xl" : "text-sm font-semibold leading-none"}`}>{countdown ? String(countdown[key]).padStart(2, "0") : "—"}</span>
          <span className={`block ${large ? "mt-2 text-[10px] uppercase tracking-widest sm:text-xs" : "mt-0.5 text-[9px] leading-none"}`}>{["Days", "Hrs", "Min", "Sec"][index]}</span>
        </div>
      </div>
    ))}
  </div>
);