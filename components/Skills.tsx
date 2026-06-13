import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SkillCategory, SKILL_CATEGORIES } from "../data";
import { Layers3, Radio, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Stagger entry animations on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        ".skills-header",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: ".skills-header",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Stagger categories
      gsap.fromTo(
        ".skill-category-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Marquee Continuous Infinite Animation
  useEffect(() => {
    if (!marqueeRef.current) return;
    const marquee = marqueeRef.current;
    
    // GSAP marquee scrolling
    const width = marquee.scrollWidth / 2;
    gsap.fromTo(
      marquee,
      { x: 0 },
      {
        x: -width,
        duration: 25,
        repeat: -1,
        ease: "none",
      }
    );
  }, []);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="py-24 md:py-36 px-6 md:px-12 xl:px-24 bg-[#0B0B0B] relative overflow-hidden"
    >
      {/* Background visual details */}
      <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-white/[0.01] to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="skills-header flex flex-col items-start mb-20">
          <div className="flex items-center gap-2 mb-4">
            <Radio className="w-4.5 h-4.5 text-soft-grey animate-pulse" />
            <span className="font-mono text-[10px] tracking-widest text-soft-grey uppercase">
              ENGINE & ARCHITECTURE DECK
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-syne font-extrabold tracking-tight text-light-text mb-6">
            TECHNICAL AMMUNITION
          </h2>
          <div className="h-[1px] w-24 bg-white/20" />
        </div>

        {/* 1. Infinite Horizontal Marquee Tag Belt */}
        <div id="skills-marquee-container" className="w-full relative overflow-hidden h-14 border-t border-b border-white/5 py-4 mb-20 bg-[#161616]/20 backdrop-blur-3xl select-none">
          {/* Fading side edges for glass visual */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0B0B0B] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0B0B0B] to-transparent z-10 pointer-events-none" />

          <div className="flex whitespace-nowrap gap-10" ref={marqueeRef}>
            {/* Doubled categories for loop */}
            {[...MARQUEE_SKILLS, ...MARQUEE_SKILLS].map((sk, index) => (
              <div
                key={`${sk}-${index}`}
                className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-soft-grey hover:text-[#F5F5F5] transition-colors"
              >
                <Sparkles className="w-3 h-3 text-white/45" />
                <span>{sk.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Bento Interactive Grid of Categorized Skill decks */}
        <div className="skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat: SkillCategory, i: number) => (
            <SkillCategoryCard key={cat.title} category={cat} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

// Marquee text tags
const MARQUEE_SKILLS = [
  "React 19", "Next.js Latest", "TypeScript", "Node.js", "Express.js", 
  "PostgreSQL", "MongoDB", "Firebase", "Supabase", "React Native", 
  "Python", "LangChain", "LangGraph", "Vector Databases", "HTML5 & CSS3", 
  "JavaScript", "REST APIs", "Tailwind CSS v4", "n8n Automation",
  "Cursor IDE", "Claude Code", "Antigravity 2.0"
];

// Interactive Skill Category Bento Card Component
function SkillCategoryCard({ category, index }: { category: SkillCategory; index: number; key?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Mouse coordinate tracker for localized card spotlights
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    cardRef.current.style.setProperty("--card-mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--card-mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group skill-category-card relative p-8 h-full bg-[#161616]/40 border rounded-none transition-all duration-500 flex flex-col justify-between overflow-hidden"
      style={{
        borderColor: hovered ? "rgba(255, 255, 255, 0.18)" : "rgba(255, 255, 255, 0.05)",
        backgroundColor: hovered ? "rgba(22, 22, 22, 0.7)" : "rgba(22,22,22,0.3)",
      }}
    >
      {/* Dynamic Localized Hover Lighting Layer */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{
          opacity: hovered ? 1 : 0,
          background: "radial-gradient(circle 200px at var(--card-mouse-x, 50%) var(--card-mouse-y, 50%), rgba(255, 255, 255, 0.04), transparent 85%)"
        }}
      />

      {/* Grid bounds details */}
      <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-white/10 select-none">
        0{index + 1} // TECH
      </div>

      <div>
        {/* Category Header */}
        <h3 className="font-syne font-bold text-lg tracking-tight text-light-text mb-6 flex items-center gap-2">
          <Layers3 className="w-4 h-4 text-white/30" />
          {category.title}
        </h3>

        {/* Individual Skills Lists */}
        <div className="flex flex-col gap-4">
          {category.skills.map((skill) => (
            <div key={skill.name} className="flex items-center gap-3.5 py-1 border-b border-white/[0.03] last:border-0">
              <div className="w-1 h-1 bg-white/20 group-hover:bg-[#F5F5F5] transition-colors duration-500 rounded-none group-hover:shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
              <span className="text-soft-grey tracking-wide font-light text-xs sm:text-sm font-mono group-hover:text-[#F5F5F5] transition-colors duration-500 select-text">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Small Tech Deck Signoff */}
      <div className="mt-8 pt-4 border-t border-white/[0.03] flex items-center justify-between font-mono text-[9px] text-soft-grey/40">
        <span>STABILITY: SECURE</span>
        <span>LATENCY: &lt;5MS</span>
      </div>
    </div>
  );
}
