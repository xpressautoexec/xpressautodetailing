import { useState, useRef, useCallback } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import beforeImg from "@/assets/before-detail.jpg";
import afterImg from "@/assets/after-detail.jpg";

const BeforeAfterSlider = () => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <section className="py-20 bg-background">
      <div className="container max-w-4xl">
        <ScrollReveal>
          <h2 className="font-heading font-black text-3xl md:text-4xl uppercase text-center text-foreground mb-3">
            See the <span className="text-primary">Difference</span>
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
            Drag the slider to reveal the transformation our detailing delivers.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div
            ref={containerRef}
            className="relative w-full aspect-video rounded-xl overflow-hidden cursor-col-resize select-none shadow-2xl"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            role="slider"
            aria-label="Before and after comparison slider"
            aria-valuenow={Math.round(position)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {/* After image (full background) */}
            <img
              src={afterImg}
              alt="After professional detailing"
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />

            {/* Before image (clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${position}%` }}
            >
              <img
                src={beforeImg}
                alt="Before detailing"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : "100vw", maxWidth: "none" }}
                draggable={false}
              />
            </div>

            {/* Slider line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-primary-foreground z-10"
              style={{ left: `${position}%`, transform: "translateX(-50%)" }}
            >
              {/* Handle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary-foreground shadow-lg flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-brand-dark">
                  <path d="M7 4L3 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13 4L17 10L13 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Labels */}
            <span className="absolute top-4 left-4 bg-brand-dark/70 text-primary-foreground font-heading font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded z-20">
              Before
            </span>
            <span className="absolute top-4 right-4 bg-primary/90 text-primary-foreground font-heading font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded z-20">
              After
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;
