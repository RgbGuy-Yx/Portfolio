import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setHidden(false);
      const { clientX, clientY } = e;
      
      // Update dot position instantly
      if (dotRef.current) {
        dotRef.current.style.left = `${clientX}px`;
        dotRef.current.style.top = `${clientY}px`;
      }

      // Smooth custom cursor ring interpolation
      if (ringRef.current) {
        // Animate smoothly
        ringRef.current.animate(
          [
            { left: ringRef.current.style.left, top: ringRef.current.style.top },
            { left: `${clientX}px`, top: `${clientY}px` }
          ],
          { duration: 400, fill: "forwards" }
        );
      }
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // Attach hover listeners for interactive elements
    const setupInteractiveHover = () => {
      const interactives = document.querySelectorAll(
        'a, button, [role="button"], input, select, textarea, .project-card, .timeline-card'
      );
      
      const onEnter = () => setHovered(true);
      const onLeave = () => setHovered(false);

      interactives.forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });

      return () => {
        interactives.forEach((el) => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
        });
      };
    };

    // Listeners for mousemove and window actions
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Initial interactive hover setup
    const cleanupHover = setupInteractiveHover();

    // Re-run setup on DOM changes to catch newly mounted interactive elements
    const observer = new MutationObserver(() => {
      cleanupHover();
      setupInteractiveHover();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cleanupHover();
      observer.disconnect();
    };
  }, []);

  // Avoid rendering on mobile/touch interfaces for clean UX
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(
        window.matchMedia("(max-width: 768px)").matches || 
        "ontouchstart" in window
      );
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  if (isMobile || hidden) return null;

  return (
    <>
      {/* Inner Pinpoint */}
      <div
        id="cursor-dot"
        ref={dotRef}
        className="cursor-dot"
        style={{
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.7 : hovered ? 0.5 : 1})`,
          transition: "transform 0.15s ease",
        }}
      />
      {/* Ambient Ring */}
      <div
        id="cursor-ring"
        ref={ringRef}
        className="cursor-ring"
        style={{
          width: hovered ? "64px" : "32px",
          height: hovered ? "64px" : "32px",
          borderColor: isClicking 
            ? "#F5F5F5" 
            : hovered 
              ? "rgba(245, 245, 245, 0.85)" 
              : "rgba(245, 245, 245, 0.2)",
          backgroundColor: hovered ? "rgba(255, 255, 255, 0.04)" : "transparent",
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
}
