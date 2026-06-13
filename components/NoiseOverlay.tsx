export default function NoiseOverlay() {
  return (
    <>
      {/* Dynamic Animated Noise Overlay */}
      <div id="noise-overlay" className="noise-bg" />
      
      {/* Subtle Scanline Overlay */}
      <div 
        id="scanlines" 
        className="fixed inset-0 pointer-events-none z-40 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 50%, rgba(0,0,0,1) 50%)",
          backgroundSize: "100% 4px",
        }}
      />
    </>
  );
}
