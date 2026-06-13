import { ArrowUp, Github, Linkedin } from "lucide-react";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer id="footer" className="bg-[#0B0B0B] border-t border-white/5 py-12 px-6 md:px-12 xl:px-24 text-soft-grey select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left tagline */}
        <div className="flex flex-col md:items-start text-center md:text-left gap-1">
          <span className="font-mono text-[9px] tracking-widest text-[#F5F5F5]">
            © {new Date().getFullYear()} YUVRAJ. ALL RIGHTS RESERVED.
          </span>
          <p className="text-[10px] text-soft-grey/40 font-mono tracking-wider">
            HAND-ENGRAVED IN THE CLOUD PREVIEW MATRIX
          </p>
        </div>

        {/* Center quote */}
        <span className="hidden lg:block text-[11px] font-mono tracking-widest text-soft-grey/30">
          “INTELLIGENT RESTRAINT IS THE ULTIMATE SOPHISTICATION.”
        </span>

        {/* Scroll back to top link */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <a href="https://www.linkedin.com/in/yuvraj7singh/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-soft-grey hover:text-[#F5F5F5] transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://github.com/RgbGuy-Yx" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-soft-grey hover:text-[#F5F5F5] transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
        
          <button
          id="footer-back-to-top"
          onClick={handleScrollToTop}
          className="group flex items-center gap-1.5 font-mono text-[10px] hover:text-[#F5F5F5] transition-colors focus:outline-none cursor-pointer"
        >
          BACK TO APEX
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
        </button>
        </div>
      </div>
    </footer>
  );
}
