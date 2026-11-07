/**
 * Front view of a windshield showing where the protection film goes:
 * the full outer glass, with a typical rock-chip zone. Cameras and sensors behind the glass keep working.
 */
const WindshieldDiagram = () => {
  const FILM = "hsl(var(--electric))";
  const STROKE = "hsl(var(--ink) / 0.35)";
  const INK = "hsl(var(--ink) / 0.7)";

  return (
    <svg viewBox="0 0 480 260" className="h-auto w-full" role="img" aria-label="Windshield protection film coverage diagram">
      {/* Body and A-pillars */}
      <path d="M20 250 L60 40 Q240 10 420 40 L460 250 Z" fill="hsl(var(--line))" fillOpacity="0.55" stroke={STROKE} />
      {/* Windshield glass with film */}
      <path d="M78 228 L104 60 Q240 38 376 60 L402 228 Q240 240 78 228 Z" fill={FILM} fillOpacity="0.22" stroke={FILM} strokeWidth="2.5" />
      {/* Film edge inset line */}
      <path d="M90 220 L113 68 Q240 48 367 68 L390 220 Q240 231 90 220 Z" fill="none" stroke={FILM} strokeWidth="1" strokeDasharray="5 4" />

      {/* Camera / rain-sensor housing */}
      <rect x="220" y="52" width="40" height="30" rx="5" fill="hsl(var(--background))" stroke={STROKE} />
      <circle cx="240" cy="67" r="6" fill="hsl(var(--ink) / 0.6)" />

      {/* Rock-impact zone (lower half, driver side) */}
      <ellipse cx="170" cy="180" rx="70" ry="34" fill="none" stroke="hsl(var(--ink) / 0.45)" strokeDasharray="3 3" />
      {[
        [140, 175],
        [182, 190],
        [205, 168],
        [158, 198],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`} stroke={INK} strokeWidth="1.4">
          <line x1={x - 4} y1={y} x2={x + 4} y2={y} />
          <line x1={x} y1={y - 4} x2={x} y2={y + 4} />
        </g>
      ))}

      {/* Labels */}
      <g fontSize="12" fontWeight="700" fill={INK}>
        <line x1="260" y1="67" x2="300" y2="100" stroke={INK} />
        <text x="266" y="112">Cameras and sensors keep working</text>
        <text x="110" y="132" fill={FILM}>Film over the full outer glass</text>
        <text x="122" y="244" fontWeight="600" fontSize="11">Common rock-chip zone</text>
      </g>
    </svg>
  );
};

export default WindshieldDiagram;
