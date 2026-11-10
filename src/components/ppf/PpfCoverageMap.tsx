/**
 * Top-down vehicle, front at the top. Panels covered by the selected film package fill blue.
 * Optional numbered markers show where rock chips happen.
 */

export type PpfPackageId = "partial-front" | "full-front" | "track-pack" | "full-vehicle";

type Panel = { id: string; d: string; glass?: boolean };

const P: Panel[] = [
  { id: "bumper", d: "M70 24 Q150 4 230 24 L246 58 L54 58 Z" },
  { id: "headlight-l", d: "M62 56 L96 56 L92 70 L66 72 Z" },
  { id: "headlight-r", d: "M238 56 L204 56 L208 70 L234 72 Z" },
  { id: "hood-lead", d: "M80 58 L220 58 L222 104 L78 104 Z" },
  { id: "hood-rest", d: "M78 104 L222 104 L218 196 L82 196 Z" },
  { id: "fender-l-lead", d: "M48 58 L80 58 L78 112 L44 112 Z" },
  { id: "fender-l-rest", d: "M44 112 L78 112 L82 214 L44 214 Z" },
  { id: "fender-r-lead", d: "M252 58 L220 58 L222 112 L256 112 Z" },
  { id: "fender-r-rest", d: "M256 112 L222 112 L218 214 L256 214 Z" },
  { id: "windshield", d: "M84 198 L216 198 L206 252 L94 252 Z", glass: true },
  { id: "pillar-l", d: "M82 198 L84 198 L94 252 L84 256 L74 214 Z" },
  { id: "pillar-r", d: "M218 198 L216 198 L206 252 L216 256 L226 214 Z" },
  { id: "roof", d: "M94 254 L206 254 L210 396 L90 396 Z" },
  { id: "mirror-l", d: "M20 206 L44 214 L44 230 L22 226 Z" },
  { id: "mirror-r", d: "M280 206 L256 214 L256 230 L278 226 Z" },
  { id: "door-fl", d: "M50 216 L84 216 L88 322 L50 322 Z" },
  { id: "door-rl", d: "M50 324 L88 324 L88 418 L50 418 Z" },
  { id: "door-fr", d: "M250 216 L216 216 L212 322 L250 322 Z" },
  { id: "door-rr", d: "M250 324 L212 324 L212 418 L250 418 Z" },
  { id: "edges-l", d: "M50 318 L88 318 L88 326 L50 326 Z M50 414 L88 414 L88 420 L50 420 Z M60 262 h14 v6 h-14 Z M60 360 h14 v6 h-14 Z" },
  { id: "edges-r", d: "M250 318 L212 318 L212 326 L250 326 Z M250 414 L212 414 L212 420 L250 420 Z M240 262 h-14 v6 h14 Z M240 360 h-14 v6 h14 Z" },
  { id: "rocker-l", d: "M40 216 L50 216 L50 420 L40 420 Z" },
  { id: "rocker-r", d: "M260 216 L250 216 L250 420 L260 420 Z" },
  { id: "rear-glass", d: "M92 398 L208 398 L214 440 L86 440 Z", glass: true },
  { id: "impact-l", d: "M40 422 L88 422 L86 448 L42 448 Z" },
  { id: "impact-r", d: "M260 422 L212 422 L214 448 L258 448 Z" },
  { id: "quarter-l", d: "M42 448 L86 448 L82 508 L50 508 Z" },
  { id: "quarter-r", d: "M258 448 L214 448 L218 508 L250 508 Z" },
  { id: "trunk", d: "M86 442 L214 442 L218 508 L82 508 Z" },
  { id: "rear-bumper", d: "M50 510 L250 510 L238 540 Q150 556 62 540 Z" },
];

const WHEELS = ["M28 120 h12 v62 h-12 Z", "M260 120 h12 v62 h-12 Z", "M28 436 h12 v62 h-12 Z", "M260 436 h12 v62 h-12 Z"];

const PARTIAL = ["bumper", "hood-lead", "fender-l-lead", "fender-r-lead", "mirror-l", "mirror-r"];
const FULL_FRONT = [...PARTIAL, "hood-rest", "fender-l-rest", "fender-r-rest", "headlight-l", "headlight-r"];
const TRACK = [...FULL_FRONT, "rocker-l", "rocker-r", "pillar-l", "pillar-r", "edges-l", "edges-r", "impact-l", "impact-r"];
const FULL_BODY = P.filter((p) => !p.glass).map((p) => p.id);

export const PPF_COVERAGE: Record<PpfPackageId, string[]> = {
  "partial-front": PARTIAL,
  "full-front": FULL_FRONT,
  "track-pack": TRACK,
  "full-vehicle": FULL_BODY,
};

/** Where chips happen: numbered markers on the drawing. */
export const CHIP_ZONES = [
  { n: 1, label: "Hood leading edge", body: "The first painted surface a stone hits at highway speed.", x: 150, y: 80 },
  { n: 2, label: "Front bumper", body: "Takes gravel thrown by the vehicle ahead, every trip.", x: 150, y: 36 },
  { n: 3, label: "Front fenders", body: "Sandblasted by your own front tires in winter.", x: 62, y: 150 },
  { n: 4, label: "Mirrors", body: "Stick out into the airflow and catch what the bumper misses.", x: 268, y: 218 },
  { n: 5, label: "Door edges", body: "Parking-lot dings and chips when doors open against things.", x: 69, y: 322 },
  { n: 6, label: "Rocker panels", body: "Salt, sand and gravel from the front wheels all winter.", x: 45, y: 380 },
];

const PpfCoverageMap = ({
  selected,
  windshield = false,
  zones = false,
  className = "",
  title,
}: {
  selected: PpfPackageId;
  windshield?: boolean;
  zones?: boolean;
  className?: string;
  title: string;
}) => {
  const covered = new Set(PPF_COVERAGE[selected]);
  return (
    <svg viewBox="0 0 300 560" role="img" aria-label={title} className={className}>
      {WHEELS.map((d) => (
        <path key={d} d={d} fill="hsl(var(--charcoal))" />
      ))}
      {P.map((p) => {
        const on = p.glass ? p.id === "windshield" && windshield : covered.has(p.id);
        const fill = on ? "hsl(var(--electric))" : p.glass ? "hsl(216 25% 90%)" : "hsl(var(--surface))";
        return (
          <path
            key={p.id}
            d={p.d}
            fill={fill}
            fillOpacity={on ? (p.glass ? 0.55 : 0.88) : 1}
            stroke={on ? "hsl(var(--electric-2))" : "hsl(216 15% 76%)"}
            strokeWidth={1.25}
            strokeLinejoin="round"
            style={{ transition: "fill 220ms ease, fill-opacity 220ms ease, stroke 220ms ease" }}
          />
        );
      })}
      {zones &&
        CHIP_ZONES.map((z) => (
          <g key={z.n} aria-hidden="true">
            <circle cx={z.x} cy={z.y} r={11} fill="hsl(var(--charcoal))" stroke="white" strokeWidth={2} />
            <text x={z.x} y={z.y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill="white" fontFamily="Inter, sans-serif">
              {z.n}
            </text>
          </g>
        ))}
    </svg>
  );
};

export default PpfCoverageMap;
