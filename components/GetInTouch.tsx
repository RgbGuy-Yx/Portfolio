import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Mail, Github, Linkedin, Twitter, Check, Copy, ArrowUpRight } from "lucide-react";

export default function GetInTouch() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const magneticBtnRef = useRef<HTMLDivElement>(null);
  const emailStr = "ys0609392@gmail.com";
  const [copied, setCopied] = useState(false);

  // Entrance Scroll animation
  useEffect(() => {
    gsap.fromTo(
      ".contact-node",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        scrollTrigger: {
          trigger: "#contact",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  // Magnetic Button Effect on the Hire/Email pill
  useEffect(() => {
    const btn = magneticBtnRef.current;
    if (!btn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Distance checking to only trigger when close
      const distance = Math.sqrt(x * x + y * y);
      if (distance < 150) {
        // Shift button towards the mouse subtly
        gsap.to(btn, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        // Return to center
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (btn) btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-32 md:py-44 px-6 md:px-12 xl:px-24 bg-[#0B0B0B] relative overflow-hidden flex flex-col items-center justify-center select-none"
    >
      {/* Visual Backdrops */}
      <div className="absolute inset-0 grid-overlay opacity-[0.08] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] spotlight-radial pointer-events-none opacity-60" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center z-10 w-full">
        
        {/* Subtle Pretitle */}
        <div className="contact-node flex items-center gap-2 mb-6 font-mono text-[10px] tracking-widest text-soft-grey">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
          AVAILABLE FOR WORLDWIDE ASSIGNMENTS
        </div>

        {/* Emotion-driven CTA display header */}
        <h2
          ref={titleRef}
          className="contact-node text-4xl sm:text-6xl md:text-7xl font-syne font-extrabold tracking-tight text-light-text mb-8 uppercase leading-[1.05]"
        >
          LET’S FABRICATE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-light-text via-soft-grey/40 to-white/10">
            THE UNFORGETTABLE
          </span>
        </h2>

        {/* Closing emotional prompt */}
        <p className="contact-node text-soft-grey text-base md:text-lg font-light tracking-wide max-w-xl mb-12 leading-relaxed">
          Open to full-time leading positions, high-end freelance ventures, and creative technical partnerships that push the boundary of visual browsers.
        </p>

        {/* Magnetic Copy Pill */}
        <div className="contact-node relative mb-16" style={{ perspective: 1000 }}>
          <div
            ref={magneticBtnRef}
            onClick={handleCopyEmail}
            className="group px-8 py-5 border border-white/15 bg-[#161616]/75 hover:bg-[#161616] hover:border-white transition-all duration-300 rounded-none cursor-pointer flex items-center gap-3 shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
          >
            <Mail className="w-4 h-4 text-soft-grey group-hover:text-light-text transition-colors" />
            <span className="font-mono text-xs sm:text-sm tracking-widest text-[#F5F5F5]">
              YSO609392@GMAIL.COM
            </span>
            <div className="w-[1px] h-4 bg-white/20 mx-1" />
            <button
              id="copy-indicator-btn"
              aria-label="Copy email address"
              className="flex items-center gap-1 text-[10px] font-mono text-soft-grey group-hover:text-light-text transition-colors focus:outline-none"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-400" />
                  COPIED
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  COPY
                </>
              )}
            </button>
          </div>
        </div>

        {/* Infinite Grid of Social anchors */}
        <div className="contact-node flex flex-wrap justify-center items-center gap-8 md:gap-14 border-t border-b border-white/5 py-8 w-full">
          <a
            id="contact-social-github"
            href="https://github.com/RgbGuy-Yx"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 font-mono text-xs text-soft-grey hover:text-light-text transition-all duration-300 transform hover:scale-105"
          >
            <Github className="w-4 h-4" />
            GITHUB
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform opacity-40 group-hover:opacity-100" />
          </a>

          <a
            id="contact-social-linkedin"
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 font-mono text-xs text-soft-grey hover:text-light-text transition-all duration-300 transform hover:scale-105"
          >
            <Linkedin className="w-4 h-4" />
            LINKEDIN
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform opacity-40 group-hover:opacity-100" />
          </a>

          <a
            id="contact-social-twitter"
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 font-mono text-xs text-soft-grey hover:text-light-text transition-all duration-300 transform hover:scale-105"
          >
            <Twitter className="w-4 h-4" />
            TWITTER / X
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform opacity-40 group-hover:opacity-100" />
          </a>
        </div>

      </div>
    </section>
  );
}
