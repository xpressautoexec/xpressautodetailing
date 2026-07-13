interface Props {
  package: "partial" | "full" | "track" | "body";
}

// Zones highlighted per package
const ZONES: Record<Props["package"], Set<string>> = {
  partial: new Set(["bumper", "hoodPartial", "fenderPartial", "mirrors", "headlights"]),
  full: new Set(["bumper", "hoodFull", "fenderFull", "mirrors", "headlights"]),
  track: new Set(["bumper", "hoodFull", "fenderFull", "mirrors", "headlights", "rocker", "aPillar", "doorCups"]),
  body: new Set([
    "bumper", "hoodFull", "fenderFull", "mirrors", "headlights",
    "rocker", "aPillar", "doorCups", "door", "quarter", "roof", "rearBumper", "trunk",
  ]),
};

const ON = "hsl(210 95% 55%)";
const OFF = "hsl(220 20% 18%)";
const OUTLINE = "hsl(220 15% 45%)";

export default function PPFCoverageDiagram({ package: pkg }: Props) {
  const on = ZONES[pkg];
  const fill = (id: string) => (on.has(id) ? ON : OFF);

  return (
    <svg
      viewBox="0 0 600 300"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-h-[340px] drop-shadow-2xl"
      role="img"
      aria-label={`PPF coverage: ${pkg}`}
    >
      <defs>
        <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(210 40% 35%)" />
          <stop offset="100%" stopColor="hsl(210 40% 20%)" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Side profile car — coupe silhouette */}
      <g filter="url(#glow)">
        {/* Roof */}
        <path
          d="M 175 105 Q 260 55 355 55 Q 420 55 445 105 Z"
          fill={fill("roof")}
          stroke={OUTLINE}
          strokeWidth="1.2"
        />
        {/* Windows (non-selectable) */}
        <path d="M 190 108 Q 265 68 350 68 Q 410 68 435 108 Z" fill="url(#glass)" />
        <line x1="315" y1="70" x2="315" y2="108" stroke="hsl(220 20% 10%)" strokeWidth="2" />

        {/* A-pillar */}
        <path d="M 188 108 L 200 108 L 265 72 L 258 72 Z" fill={fill("aPillar")} stroke={OUTLINE} strokeWidth="0.8" />

        {/* Rear quarter panel */}
        <path
          d="M 355 105 L 445 105 L 500 150 L 500 200 L 430 200 L 380 155 Z"
          fill={fill("quarter")}
          stroke={OUTLINE}
          strokeWidth="1.2"
        />

        {/* Trunk lid (small triangle behind roof line) */}
        <path d="M 420 105 L 445 105 L 470 130 L 430 130 Z" fill={fill("trunk")} stroke={OUTLINE} strokeWidth="0.8" />

        {/* Door panel (main) */}
        <path
          d="M 200 108 L 355 108 L 380 155 L 380 205 L 210 205 L 200 200 Z"
          fill={fill("door")}
          stroke={OUTLINE}
          strokeWidth="1.2"
        />
        {/* Door cup / handle strip */}
        <rect x="245" y="135" width="90" height="10" rx="3" fill={fill("doorCups")} stroke={OUTLINE} strokeWidth="0.6" />

        {/* Hood — full */}
        <path
          d="M 85 155 L 175 108 L 200 108 L 200 155 Z"
          fill={fill("hoodFull")}
          stroke={OUTLINE}
          strokeWidth="1.2"
        />
        {/* Hood partial overlay (front 1/3) — only shown when partial selected */}
        {on.has("hoodPartial") && !on.has("hoodFull") && (
          <path d="M 85 155 L 130 131 L 145 155 Z" fill={ON} stroke={OUTLINE} strokeWidth="0.6" />
        )}

        {/* Fender (front) */}
        <path
          d="M 85 155 L 200 155 L 200 205 L 130 205 Z"
          fill={fill("fenderFull")}
          stroke={OUTLINE}
          strokeWidth="1.2"
        />
        {on.has("fenderPartial") && !on.has("fenderFull") && (
          <path d="M 85 155 L 145 155 L 145 200 L 100 200 Z" fill={ON} stroke={OUTLINE} strokeWidth="0.6" />
        )}

        {/* Front bumper */}
        <path
          d="M 55 165 Q 55 210 90 218 L 130 218 L 130 205 L 85 205 L 85 165 Z"
          fill={fill("bumper")}
          stroke={OUTLINE}
          strokeWidth="1.2"
        />
        {/* Headlight */}
        <ellipse cx="90" cy="170" rx="18" ry="9" fill={fill("headlights")} stroke={OUTLINE} strokeWidth="0.6" />

        {/* Rear bumper */}
        <path
          d="M 500 165 Q 545 175 545 210 L 505 218 L 465 218 L 465 200 L 500 200 Z"
          fill={fill("rearBumper")}
          stroke={OUTLINE}
          strokeWidth="1.2"
        />

        {/* Mirror */}
        <path d="M 195 108 L 215 100 L 225 108 L 215 118 Z" fill={fill("mirrors")} stroke={OUTLINE} strokeWidth="0.8" />

        {/* Rocker panel */}
        <rect x="130" y="205" width="335" height="12" fill={fill("rocker")} stroke={OUTLINE} strokeWidth="0.8" />

        {/* Wheels */}
        <circle cx="170" cy="225" r="30" fill="hsl(220 20% 8%)" stroke="hsl(220 15% 25%)" strokeWidth="1.5" />
        <circle cx="170" cy="225" r="16" fill="hsl(220 15% 20%)" />
        <circle cx="170" cy="225" r="5" fill="hsl(220 20% 8%)" />

        <circle cx="425" cy="225" r="30" fill="hsl(220 20% 8%)" stroke="hsl(220 15% 25%)" strokeWidth="1.5" />
        <circle cx="425" cy="225" r="16" fill="hsl(220 15% 20%)" />
        <circle cx="425" cy="225" r="5" fill="hsl(220 20% 8%)" />

        {/* Ground shadow */}
        <ellipse cx="300" cy="270" rx="230" ry="6" fill="hsl(220 30% 5%)" opacity="0.5" />
      </g>

      {/* Legend */}
      <g transform="translate(20, 20)">
        <rect x="0" y="0" width="14" height="14" rx="2" fill={ON} />
        <text x="20" y="11" fontSize="11" fill="hsl(0 0% 90%)" fontFamily="system-ui, sans-serif" fontWeight="600">
          Protected
        </text>
      </g>
    </svg>
  );
}
