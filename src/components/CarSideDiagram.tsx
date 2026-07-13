interface CarSideDiagramProps {
  activePanels: string[];
  highlightColor?: string;
  className?: string;
}

/**
 * Realistic side-profile car diagram (modern sedan / coupe silhouette).
 * viewBox: 0 0 500 200. Origin top-left. Ground at y ~= 170.
 *
 * Panel keys used across PPF and Window Tint pages.
 */
const PANELS: Record<string, string> = {
  // --- PAINT / BODY PANELS ---
  // Front bumper: rounded nose from lower front to headlight line
  bumperFront:
    "M 20 130 Q 12 118 20 105 L 55 100 Q 62 115 60 132 L 55 145 Q 35 145 20 130 Z",
  // Hood: sloping surface from cowl down to nose
  hood:
    "M 60 100 L 155 78 L 170 92 L 65 118 Z",
  // Partial hood (front ~35% only)
  hoodPartial:
    "M 60 100 L 100 91 L 108 105 L 65 115 Z",
  // Front fender: wraps front wheel arch
  fender:
    "M 60 118 L 130 108 L 130 145 Q 100 138 60 140 Z",
  // Headlight cluster (sleek modern)
  headlight:
    "M 32 102 Q 48 98 62 102 L 60 112 Q 45 112 34 112 Z",
  // Side mirror (mounted on A-pillar / front door)
  mirror:
    "M 168 82 L 182 78 L 186 88 L 174 92 Z",
  // Front door skin (between wheel arches, below beltline)
  frontDoor:
    "M 155 92 L 270 88 L 270 145 L 155 145 Z",
  // Rear door
  rearDoor:
    "M 270 88 L 375 90 L 375 145 L 270 145 Z",
  // Rear quarter panel
  rearQuarter:
    "M 375 90 L 445 100 L 448 145 L 375 145 Z",
  // Rear bumper
  bumperRear:
    "M 445 105 Q 480 110 480 130 Q 478 148 448 145 L 445 130 Z",
  // Trunk lid (short deck lid for sedan)
  trunk:
    "M 400 85 L 448 100 L 448 108 L 402 96 Z",
  // Rocker panel (sill below doors)
  rocker:
    "M 60 145 L 448 145 L 448 158 L 60 158 Z",
  // A-pillar (front windshield frame)
  aPillar:
    "M 155 78 L 168 78 L 175 92 L 158 92 Z",
  // Roof (main section between A and C pillars)
  roof:
    "M 170 46 L 370 46 L 385 62 L 165 62 Z",
  // Roof full (extended)
  roofFull:
    "M 165 44 L 385 44 L 400 62 L 155 62 Z",
  // Door cups (handle recesses)
  doorCup:
    "M 210 105 L 250 105 L 250 114 L 210 114 Z M 305 105 L 350 105 L 350 114 L 305 114 Z",

  // --- GLASS (used for window tint) ---
  // Windshield (front glass, rakes back)
  windshield:
    "M 155 78 L 240 46 L 268 46 L 175 92 Z",
  // Front door glass
  frontDoorGlass:
    "M 175 62 L 268 62 L 268 88 L 175 88 Z",
  // Rear door glass
  rearDoorGlass:
    "M 275 62 L 365 62 L 365 88 L 275 88 Z",
  // Rear windshield
  rearGlass:
    "M 370 62 L 400 62 L 402 90 L 375 88 Z",
  // Sunroof (top glass panel)
  sunroof:
    "M 235 44 L 335 44 L 335 54 L 235 54 Z",
};

const CarSideDiagram = ({
  activePanels,
  highlightColor = "hsl(48 96% 53%)",
  className = "",
}: CarSideDiagramProps) => {
  const active = new Set(activePanels);
  const bodyFill = "hsl(220 15% 88%)";
  const bodyStroke = "hsl(220 15% 55%)";
  const glassFill = "hsl(220 30% 30%)";

  return (
    <svg
      viewBox="0 0 500 200"
      className={`w-full h-auto ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="carBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(220 15% 94%)" />
          <stop offset="55%" stopColor="hsl(220 15% 82%)" />
          <stop offset="100%" stopColor="hsl(220 15% 70%)" />
        </linearGradient>
        <linearGradient id="carGlass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(210 25% 40%)" />
          <stop offset="100%" stopColor="hsl(210 30% 22%)" />
        </linearGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="250" cy="182" rx="220" ry="6" fill="hsl(220 15% 30%)" opacity="0.18" />

      {/* Full body silhouette (single flowing path) */}
      <path
        d="
          M 22 130
          Q 12 118 20 104
          L 60 98
          L 155 78
          Q 180 50 240 44
          L 340 44
          Q 380 46 400 76
          L 448 100
          Q 480 110 480 132
          Q 478 152 448 152
          L 448 158
          L 60 158
          L 60 152
          Q 38 152 22 140
          Z
        "
        fill="url(#carBody)"
        stroke={bodyStroke}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* Greenhouse / glass area */}
      <path
        d="M 155 78 Q 180 50 240 44 L 340 44 Q 380 46 400 76 L 380 82 L 175 82 Z"
        fill="url(#carGlass)"
        opacity="0.9"
      />
      {/* Window pillar dividers */}
      <line x1="270" y1="46" x2="270" y2="82" stroke={bodyStroke} strokeWidth="1.5" />
      <line x1="368" y1="46" x2="378" y2="82" stroke={bodyStroke} strokeWidth="1.5" />

      {/* Belt line */}
      <line x1="60" y1="98" x2="448" y2="100" stroke={bodyStroke} strokeWidth="0.6" opacity="0.5" />

      {/* Highlighted panels (rendered on top of the body) */}
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

      {/* Wheel wells (drawn on top so highlights don't spill into them) */}
      <circle cx="115" cy="148" r="26" fill="hsl(220 15% 15%)" />
      <circle cx="115" cy="148" r="18" fill="hsl(220 15% 30%)" />
      <circle cx="115" cy="148" r="10" fill="hsl(220 15% 55%)" />
      <circle cx="400" cy="148" r="26" fill="hsl(220 15% 15%)" />
      <circle cx="400" cy="148" r="18" fill="hsl(220 15% 30%)" />
      <circle cx="400" cy="148" r="10" fill="hsl(220 15% 55%)" />

      {/* Door handles */}
      <rect x="215" y="107" width="30" height="4" rx="1.5" fill={bodyStroke} opacity="0.7" />
      <rect x="310" y="107" width="30" height="4" rx="1.5" fill={bodyStroke} opacity="0.7" />

      {/* Suppress unused warnings */}
      <g style={{ display: "none" }} data-tokens={`${bodyFill}${glassFill}`} />
    </svg>
  );
};

export default CarSideDiagram;
