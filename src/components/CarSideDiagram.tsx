interface CarSideDiagramProps {
  activePanels: string[];
  highlightColor?: string; // css color for highlighted panels
  baseColor?: string; // css color for body
  className?: string;
}

// Reusable side-profile car with named panel regions.
// Panel keys:
//  bumperFront, hood, hoodPartial, fender, headlight, mirror, aPillar, roof,
//  windshield, frontDoorGlass, rearDoorGlass, rearGlass, rocker, doorCup,
//  frontDoor, rearDoor, rearQuarter, bumperRear, trunk, roofFull
const PANELS: Record<string, string> = {
  // Body panels (paint)
  bumperFront: "M 40 155 Q 30 150 30 140 L 55 140 L 55 175 L 40 175 Z",
  hood: "M 55 118 L 165 118 L 165 140 L 55 140 Z",
  hoodPartial: "M 55 118 L 100 118 L 100 140 L 55 140 Z",
  fender: "M 55 140 L 90 140 L 90 175 L 55 175 Z",
  headlight: "M 32 128 L 55 128 L 55 140 L 32 140 Z",
  mirror: "M 165 108 L 180 108 L 180 122 L 165 122 Z",
  frontDoor: "M 175 118 L 250 118 L 250 175 L 175 175 Z",
  rearDoor: "M 250 118 L 335 118 L 335 175 L 250 175 Z",
  rearQuarter: "M 335 118 L 400 118 L 400 175 L 335 175 Z",
  bumperRear: "M 400 140 Q 410 150 410 160 L 400 175 L 400 140 Z",
  trunk: "M 350 100 L 410 130 L 410 160 L 380 160 Z",
  rocker: "M 55 175 L 400 175 L 400 190 L 55 190 Z",
  aPillar: "M 165 55 L 180 55 L 175 118 L 155 118 Z",
  roof: "M 180 45 L 300 45 L 305 55 L 175 55 Z",
  roofFull: "M 155 45 L 320 45 L 335 55 L 145 55 Z",
  doorCup: "M 205 140 L 225 140 L 225 152 L 205 152 Z M 285 140 L 305 140 L 305 152 L 285 152 Z",
  // Glass (for tint)
  windshield: "M 165 55 L 240 55 L 220 118 L 155 118 Z",
  frontDoorGlass: "M 180 55 L 250 55 L 250 116 L 180 116 Z",
  rearDoorGlass: "M 250 55 L 320 55 L 320 116 L 250 116 Z",
  rearGlass: "M 320 55 L 350 55 L 380 116 L 320 116 Z",
  sunroof: "M 220 42 L 290 42 L 290 55 L 220 55 Z",
};

const CarSideDiagram = ({
  activePanels,
  highlightColor = "hsl(var(--primary))",
  baseColor = "hsl(var(--muted-foreground) / 0.35)",
  className = "",
}: CarSideDiagramProps) => {
  const active = new Set(activePanels);
  return (
    <svg viewBox="0 0 440 240" className={`w-full ${className}`} aria-hidden="true">
      {/* Ground shadow */}
      <ellipse cx="220" cy="222" rx="180" ry="6" fill="currentColor" opacity="0.08" />

      {/* Car body silhouette */}
      <path
        d="M 30 190
           L 30 148
           Q 30 138 42 135
           L 90 130
           Q 110 100 165 55
           Q 180 45 200 43
           L 300 43
           Q 330 45 355 105
           L 405 130
           Q 415 135 415 148
           L 415 190
           Z"
        fill={baseColor}
        stroke="hsl(var(--border))"
        strokeWidth="1.5"
      />

      {/* Windows (base tint) */}
      <path
        d="M 175 60 L 240 60 L 225 115 L 165 115 Z
           M 245 60 L 320 60 L 340 115 L 250 115 Z"
        fill="hsl(220 40% 15%)"
        opacity="0.85"
      />

      {/* Body panel seams */}
      <line x1="165" y1="118" x2="180" y2="55" stroke="hsl(var(--border))" strokeWidth="1" />
      <line x1="90" y1="135" x2="90" y2="190" stroke="hsl(var(--border))" strokeWidth="0.75" opacity="0.6" />
      <line x1="175" y1="118" x2="175" y2="190" stroke="hsl(var(--border))" strokeWidth="0.75" opacity="0.6" />
      <line x1="250" y1="60" x2="250" y2="190" stroke="hsl(var(--border))" strokeWidth="0.75" opacity="0.6" />
      <line x1="335" y1="118" x2="335" y2="190" stroke="hsl(var(--border))" strokeWidth="0.75" opacity="0.6" />

      {/* Active panels overlay */}
      {Object.entries(PANELS).map(
        ([key, d]) =>
          active.has(key) && (
            <path
              key={key}
              d={d}
              fill={highlightColor}
              opacity="0.85"
              className="transition-opacity duration-500"
            />
          ),
      )}

      {/* Wheels */}
      <circle cx="110" cy="190" r="28" fill="hsl(220 15% 12%)" />
      <circle cx="110" cy="190" r="14" fill="hsl(220 10% 35%)" />
      <circle cx="110" cy="190" r="6" fill="hsl(220 15% 12%)" />
      <circle cx="345" cy="190" r="28" fill="hsl(220 15% 12%)" />
      <circle cx="345" cy="190" r="14" fill="hsl(220 10% 35%)" />
      <circle cx="345" cy="190" r="6" fill="hsl(220 15% 12%)" />

      {/* Wheel arches */}
      <circle cx="110" cy="190" r="34" fill="none" stroke="hsl(var(--border))" strokeWidth="1.5" />
      <circle cx="345" cy="190" r="34" fill="none" stroke="hsl(var(--border))" strokeWidth="1.5" />
    </svg>
  );
};

export default CarSideDiagram;
