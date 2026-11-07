import type { ReactNode } from "react";

export type CarCoverageLevel = "partial-front" | "full-front" | "track-pack" | "full-vehicle";

/**
 * Top-down schematic of a car, front at the top.
 * Highlighted panels = areas covered by paint protection film for the selected package.
 * Coverage per level mirrors CAR_PPF.covers in pricing.ts.
 */
const CarCoverageDiagram = ({ level, label = true }: { level: CarCoverageLevel; label?: boolean }) => {
  const rank = { "partial-front": 0, "full-front": 1, "track-pack": 2, "full-vehicle": 3 }[level];
  const fullFront = rank >= 1;
  const track = rank >= 2;
  const all = rank >= 3;

  const ON = "hsl(var(--electric))";
  const OFF = "hsl(var(--line))";
  const STROKE = "hsl(var(--ink) / 0.3)";

  const Panel = ({ on, d, children }: { on: boolean; d: string; children?: ReactNode }) => (
    <path d={d} fill={on ? ON : OFF} fillOpacity={on ? 0.9 : 0.55} stroke={STROKE} strokeWidth="1.2">
      {children}
    </path>
  );

  return (
    <svg
      viewBox="0 -18 220 438"
      className="mx-auto h-auto w-full max-w-[220px]"
      role="img"
      aria-label={`Paint protection film coverage diagram: ${level.replace("-", " ")}`}
    >
      {/* Wheels */}
      {[
        [18, 92],
        [184, 92],
        [18, 300],
        [184, 300],
      ].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="18" height="48" rx="6" fill="hsl(var(--ink) / 0.75)" />
      ))}

      {/* Front bumper (every package) */}
      <Panel on d="M58 18 Q110 4 162 18 L172 44 L48 44 Z" />
      {/* Hood leading edge (every package) */}
      <Panel on d="M50 46 L170 46 L168 72 L52 72 Z" />
      {/* Rest of hood */}
      <Panel on={fullFront} d="M52 74 L168 74 L162 140 L58 140 Z" />

      {/* Front fenders: leading strip (partial) and rest (full front) */}
      <Panel on d="M36 46 L48 46 L50 72 L34 72 Z" />
      <Panel on d="M184 46 L172 46 L170 72 L186 72 Z" />
      <Panel on={fullFront} d="M34 74 L50 74 L56 140 L36 140 Z" />
      <Panel on={fullFront} d="M186 74 L170 74 L164 140 L184 140 Z" />

      {/* Mirrors (every package) */}
      <Panel on d="M22 160 L36 152 L38 172 L24 174 Z" />
      <Panel on d="M198 160 L184 152 L182 172 L196 174 Z" />

      {/* Windshield (glass, not painted) */}
      <path d="M60 142 L160 142 L150 186 L70 186 Z" fill="hsl(var(--background))" stroke={STROKE} strokeWidth="1.2" />
      {/* A-pillars */}
      <Panel on={track} d="M56 142 L60 142 L70 186 L62 188 Z" />
      <Panel on={track} d="M164 142 L160 142 L150 186 L158 188 Z" />

      {/* Roof: leading edge (track pack) and rest (full vehicle) */}
      <Panel on={track} d="M70 188 L150 188 L150 202 L70 202 Z" />
      <Panel on={all} d="M70 204 L150 204 L150 268 L70 268 Z" />

      {/* Doors and quarter panels */}
      <Panel on={all} d="M36 142 L56 142 L66 290 L40 290 Z" />
      <Panel on={all} d="M184 142 L164 142 L154 290 L180 290 Z" />

      {/* Rocker panels (track pack) */}
      <Panel on={track} d="M30 150 L36 150 L40 292 L32 292 Z" />
      <Panel on={track} d="M190 150 L184 150 L180 292 L188 292 Z" />

      {/* Rear glass */}
      <path d="M72 270 L148 270 L156 300 L64 300 Z" fill="hsl(var(--background))" stroke={STROKE} strokeWidth="1.2" />

      {/* Rear arch impact zones (track pack) */}
      <Panel on={track} d="M32 294 L42 294 L44 350 L34 350 Z" />
      <Panel on={track} d="M188 294 L178 294 L176 350 L186 350 Z" />

      {/* Trunk / rear deck and rear bumper (full vehicle) */}
      <Panel on={all} d="M44 302 L176 302 L172 370 L48 370 Z" />
      <Panel on={all} d="M48 372 L172 372 L162 400 Q110 412 58 400 Z" />

      {label && (
        <g fontSize="10" fontWeight="700" fill="hsl(var(--ink) / 0.55)" textAnchor="middle">
          <text x="110" y="168">GLASS</text>
          <text x="110" y="288">GLASS</text>
          <text x="110" y="-6" fill="hsl(var(--ink) / 0.45)">FRONT</text>
        </g>
      )}
    </svg>
  );
};

export default CarCoverageDiagram;
