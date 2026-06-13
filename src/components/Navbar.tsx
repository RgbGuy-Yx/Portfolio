import React, { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

const LINKS: NavLink[] = [
  { label: "INDEX", href: "#hero" },
  { label: "PROJECTS", href: "#projects" },
  { label: "SKILLS", href: "#skills" },
  { label: "CHRONOLOGY", href: "#timeline" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Scroll handler for auto-hide and custom scroll state detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine background transparency or solid layout
      setHasScrolled(currentScrollY > 50);

      // Simple nav auto-hide on downscroll, reveal on upscroll
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setVisible(false);
      } else {
        // Scrolling up
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Intersection Observer to track active section in the viewport
  useEffect(() => {
    const sections = LINKS.map((link) => link.href.substring(1));
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.35, rootMargin: "-10% 0px -40% 0px" }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Offset for navbar height
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header
        id="navbar-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-4 md:px-8 pt-4 md:pt-6 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div
          id="navbar-container"
          className={`max-w-7xl mx-auto flex items-center justify-between rounded-full border transition-all duration-300 px-6 py-3.5 ${
            hasScrolled
              ? "bg-[#0B0B0B]/80 backdrop-blur-xl border-white/10 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.8)]"
              : "bg-transparent border-transparent"
          }`}
        >
          {/* Logo / Monogram */}
          <a
            id="nav-logo"
            href="#hero"
            onClick={(e) => handleSmoothScroll(e, "hero")}
            className="group flex items-center gap-1.5 focus:outline-none"
          >
            <div className="w-5 h-5 flex items-center justify-center border border-light-text text-[10px] font-mono leading-none font-bold group-hover:bg-light-text group-hover:text-matte-black transition-all duration-300">
              Y
            </div>
            <span className="font-mono text-xs font-semibold tracking-widest text-[#F5F5F5] group-hover:text-soft-grey transition-colors">
              YUVRAJ
            </span>
          </a>

          {/* Large Screen Navigation Menu */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-1">
            {LINKS.map((link) => {
              const id = link.href.substring(1);
              const isActive = activeSection === id;
              return (
                <a
                  key={link.href}
                  id={`nav-link-${id}`}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 focus:outline-none ${
                    isActive
                      ? "text-[#F5F5F5]"
                      : "text-soft-grey hover:text-[#F5F5F5]"
                  }`}
                >
                  {/* Sliding capsule indicator background */}
                  {isActive && (
                    <span 
                      id={`nav-indicator-${id}`}
                      className="absolute inset-0 bg-white/5 border border-white/10 rounded-full -z-10"
                    />
                  )}
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Action CTA Ribbon */}
          <div className="hidden md:flex items-center">
            <a
              id="nav-cta-button"
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, "contact")}
              className="group flex items-center gap-1 border border-white/20 hover:border-white px-4 py-2 rounded-full text-[10px] font-mono tracking-widest transition-all duration-300 bg-transparent text-light-text"
            >
              HIRE ME
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Hamburguer Toggle */}
          <button
            id="mobile-nav-toggle"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center p-2 text-light-text hover:text-soft-grey transition-colors focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Full-Screen Drawer Menu for Mobile Devices */}
      <div
        id="mobile-menu-drawer"
        className={`fixed inset-0 z-40 bg-matte-black/95 backdrop-blur-2xl transition-all duration-500 ease-in-out md:hidden flex flex-col justify-between ${
          mobileMenuOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none translate-y-4"
        }`}
      >
        <div className="h-24" /> {/* Safely clear header layout spacing */}
        
        {/* Mobile Navigation List */}
        <nav className="flex flex-col items-start px-8 py-4 gap-6">
          {LINKS.map((link, idx) => {
            const id = link.href.substring(1);
            const isActive = activeSection === id;
            return (
              <a
                key={link.href}
                id={`mobile-nav-${id}`}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, id)}
                style={{
                  transitionDelay: `${idx * 50}ms`
                }}
                className={`text-3xl font-display font-medium tracking-tight transition-all duration-300 focus:outline-none flex items-center justify-between w-full border-b border-white/5 pb-2 ${
                  isActive 
                    ? "text-light-text translate-x-1" 
                    : "text-soft-grey hover:text-light-text"
                }`}
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono text-soft-grey">0{idx + 1}</span>
              </a>
            );
          })}
        </nav>

        {/* Footer info in Mobile Drawer */}
        <div className="p-8 border-t border-white/5 flex flex-col gap-4">
          <div className="text-[10px] font-mono text-soft-grey tracking-wider">
            YS0609392@GMAIL.COM
          </div>
          <div className="text-xs text-soft-grey/60">
            © 2026 YUVRAJ. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </>
  );
}
