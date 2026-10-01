interface CoverageProps {
  level: "front-cap" | "front-plus" | "high-impact" | "full-body";
}

/**
 * Side-profile schematic of a Class A / Class C motorhome.
 * Highlighted regions = areas covered by PPF for the selected package.
 */
const RVCoverageDiagram = ({ level }: CoverageProps) => {
  // Coverage flags
  const cap = true; // every package covers front cap
  const hood = level !== "front-cap";
  const mirrors = level !== "front-cap";
  const rockerLower = level === "high-impact" || level === "full-body";
  const wheelArches = level === "high-impact" || level === "full-body";
  const slideOut = level === "high-impact" || level === "full-body";
  const fullSides = level === "full-body";
  const rear = level === "full-body";

  const ON = "hsl(var(--electric))";
  const OFF = "hsl(var(--line))";
  const STROKE = "hsl(var(--ink) / 0.25)";

  return (
    <div className="w-full">
      <svg viewBox="0 0 600 220" className="w-full h-auto" role="img" aria-label="RV coverage diagram">
        {/* Ground line */}
        <line x1="20" y1="200" x2="580" y2="200" stroke={STROKE} strokeDasharray="4 4" />

        {/* Body outline (base RV) */}
        <g>
          {/* Body sides — full body */}
          <rect x="120" y="70" width="380" height="90" rx="6" fill={fullSides ? ON : OFF} opacity={fullSides ? 0.85 : 0.5} stroke={STROKE} />

          {/* Slide-out box on side */}
          <rect x="240" y="78" width="140" height="50" rx="3" fill={slideOut ? ON : OFF} opacity={slideOut ? 0.85 : 0.55} stroke={STROKE} />

          {/* Rear panel */}
          <rect x="500" y="70" width="38" height="90" rx="4" fill={rear ? ON : OFF} opacity={rear ? 0.85 : 0.5} stroke={STROKE} />

          {/* Rocker / lower body strip */}
          <rect x="120" y="155" width="418" height="14" fill={rockerLower ? ON : OFF} opacity={rockerLower ? 0.95 : 0.5} stroke={STROKE} />

          {/* Wheel arches */}
          <path d="M170 170 a26 26 0 0 1 52 0 z" fill={wheelArches ? ON : OFF} opacity={wheelArches ? 0.9 : 0.5} stroke={STROKE} />
          <path d="M430 170 a26 26 0 0 1 52 0 z" fill={wheelArches ? ON : OFF} opacity={wheelArches ? 0.9 : 0.5} stroke={STROKE} />

          {/* Wheels */}
          <circle cx="196" cy="180" r="16" fill="hsl(var(--foreground))" />
          <circle cx="196" cy="180" r="6" fill="hsl(var(--background))" />
          <circle cx="456" cy="180" r="16" fill="hsl(var(--foreground))" />
          <circle cx="456" cy="180" r="6" fill="hsl(var(--background))" />

          {/* Front cab + cap */}
          <path d="M40 160 L40 110 Q40 80 70 75 L120 70 L120 160 Z" fill={hood ? ON : OFF} opacity={hood ? 0.9 : 0.5} stroke={STROKE} />
          {/* Front cap (overhead bunk on Class C / nose on Class A) */}
          <path d="M40 110 Q40 50 95 45 L130 45 L130 70 L60 75 Z" fill={cap ? ON : OFF} opacity="0.95" stroke={STROKE} />

          {/* Windshield */}
          <path d="M50 110 L115 75 L115 110 Z" fill="hsl(var(--background))" opacity="0.85" stroke={STROKE} />

          {/* Headlights */}
          <circle cx="48" cy="150" r="5" fill="hsl(var(--foreground))" opacity="0.6" />

          {/* Mirrors */}
          <rect x="118" y="85" width="10" height="22" rx="2" fill={mirrors ? ON : OFF} opacity={mirrors ? 0.95 : 0.5} stroke={STROKE} />

          {/* Side door */}
          <rect x="380" y="90" width="30" height="65" rx="2" fill="none" stroke={STROKE} strokeDasharray="3 2" />

          {/* Window strip */}
          <rect x="135" y="85" width="100" height="22" rx="2" fill="hsl(var(--background))" opacity="0.7" stroke={STROKE} />
          <rect x="395" y="95" width="95" height="22" rx="2" fill="hsl(var(--background))" opacity="0.7" stroke={STROKE} />
        </g>

        {/* Annotation: front cap label always */}
        <g fontFamily="inherit" fontSize="10" fill="hsl(var(--foreground))">
          <line x1="85" y1="35" x2="85" y2="50" stroke={ON} strokeWidth="1.5" />
          <text x="85" y="28" textAnchor="middle" fontWeight="700" fill={ON}>FRONT CAP</text>

          {hood && (
            <>
              <line x1="80" y1="170" x2="80" y2="158" stroke={ON} strokeWidth="1.5" />
              <text x="80" y="215" textAnchor="middle" fontWeight="600">Hood</text>
            </>
          )}

          {rockerLower && (
            <>
              <line x1="300" y1="180" x2="300" y2="168" stroke={ON} strokeWidth="1.5" />
              <text x="300" y="215" textAnchor="middle" fontWeight="600">Rocker / Lower Body</text>
            </>
          )}

          {fullSides && (
            <>
              <line x1="450" y1="55" x2="450" y2="72" stroke={ON} strokeWidth="1.5" />
              <text x="450" y="48" textAnchor="middle" fontWeight="600">Full Side Panels</text>
            </>
          )}

          {rear && (
            <>
              <line x1="555" y1="115" x2="540" y2="115" stroke={ON} strokeWidth="1.5" />
              <text x="565" y="118" textAnchor="start" fontWeight="600">Rear</text>
            </>
          )}
        </g>
      </svg>
    </div>
  );
};

export default RVCoverageDiagram;
