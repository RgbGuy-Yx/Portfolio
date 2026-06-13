import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project, PROJECTS } from "../data";
import { ArrowUpRight, Github, Monitor, Layers } from "lucide-react";
import vaultImage from "../assets/images/Vault.png";
import orionImage from "../assets/images/Orion.jpeg";

// Register ScrollTrigger immediately
gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Stagger entry animations on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header subtitle and title reveal
      gsap.fromTo(
        ".projects-header",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: ".projects-header",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Staggered trigger animation for single project blocks
      const cards = gsap.utils.toArray(".project-card-wrapper");
      cards.forEach((card: any) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-24 md:py-36 px-6 md:px-12 xl:px-24 bg-[#161616] border-t border-b border-white/5 relative"
    >
      {/* Absolute Geometric Backdrop Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-radial from-white/[0.015] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="projects-header flex flex-col items-start mb-20 md:mb-28">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-4.5 h-4.5 text-soft-grey" />
            <span className="font-mono text-[10px] tracking-widest text-soft-grey uppercase">
              SELECTED ARTIFACTS / CASE STUDIES
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-syne font-extrabold tracking-tight text-light-text mb-6">
            Projects
          </h2>
          <div className="h-[1px] w-24 bg-white/20" />
        </div>

        {/* Project Case Studies - Alternating Rows */}
        <div ref={listRef} className="flex flex-col gap-28 md:gap-40">
          {PROJECTS.map((proj: Project, index: number) => {
            const isEven = index % 2 === 0;
            return (
              <ProjectBlock key={proj.id} project={proj} isEven={isEven} index={index} />
            );
          })}
        </div>

      </div>
    </section>
  );
}

// Sub-component for individual project to manage internal interaction states
function ProjectBlock({ project, isEven, index }: { project: Project; isEven: boolean; index: number; key?: string }) {
  const [hovered, setHovered] = useState(false);

  // Render a beautifully custom tech illustration corresponding to each project
  const renderVectorIllustration = (id: string) => {
    if (id === "05") {
      return (
        <img
          src={vaultImage}
          alt="Vault project preview"
          className="h-full w-full object-cover"
        />
      );
    }

    if (id === "06") {
      return (
        <img
          src={orionImage}
          alt="Orion project preview"
          className="h-full w-full object-cover"
        />
      );
    }

    switch (id) {
      case "01": // AETHER ENGINE
        return (
          <svg className="w-full h-full text-light-text/10" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Concentric rotating circles with tech lines */}
            <circle cx="200" cy="150" r="100" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" className={hovered ? "animate-[spin_40s_linear_infinite]" : ""} />
            <circle cx="200" cy="150" r="70" stroke="currentColor" strokeWidth="1" />
            <circle cx="200" cy="150" r="40" stroke="currentColor" strokeWidth="2" strokeDasharray="1 15" className={hovered ? "animate-[spin_20s_linear_infinite]" : ""} />
            <line x1="200" y1="20" x2="200" y2="280" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
            <line x1="50" y1="150" x2="350" y2="150" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
            {/* Sine wave visualIZER */}
            <path d="M 50 150 Q 125 70, 200 150 T 350 150" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.8" />
            <path d="M 50 150 Q 125 230, 200 150 T 350 150" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
          </svg>
        );
      case "02": // KHEPRI PROTOCOL
        return (
          <svg className="w-full h-full text-light-text/10" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Cryptographic hexagonal grid structure */}
            <polygon points="200,60 280,110 280,190 200,240 120,190 120,110" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
            <polygon points="200,90 250,120 250,180 200,210 150,180 150,120" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
            <circle cx="200" cy="150" r="15" stroke="currentColor" strokeWidth="2" />
            {/* Connecting cryptographic keys nodes */}
            <line x1="200" y1="60" x2="200" y2="20" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="200" cy="20" r="5" fill="currentColor" fillOpacity="0.3" />
            <line x1="120" y1="110" x2="70" y2="90" stroke="currentColor" strokeWidth="1" />
            <circle cx="70" cy="90" r="4" fill="currentColor" fillOpacity="0.3" />
            <line x1="280" y1="110" x2="330" y2="90" stroke="currentColor" strokeWidth="1" />
            <circle cx="330" cy="90" r="4" fill="currentColor" fillOpacity="0.3" />
          </svg>
        );
      case "03": // SYNTHESIS GRAPH DB
        return (
          <svg className="w-full h-full text-light-text/10" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Spatial force layout network paths */}
            <circle cx="100" cy="100" r="8" fill="currentColor" fillOpacity="0.4" stroke="currentColor" />
            <circle cx="300" cy="120" r="12" fill="currentColor" fillOpacity="0.2" stroke="currentColor" />
            <circle cx="180" cy="220" r="6" fill="currentColor" fillOpacity="0.4" stroke="currentColor" />
            <circle cx="220" cy="80" r="16" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
            
            {/* Interlaced connections */}
            <line x1="100" y1="100" x2="300" y2="120" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
            <line x1="100" y1="100" x2="180" y2="220" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
            <line x1="220" y1="80" x2="300" y2="120" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
            <line x1="220" y1="80" x2="100" y2="100" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.4" />
            <line x1="180" y1="220" x2="300" y2="120" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />

            {/* Background grid lines */}
            <circle cx="200" cy="150" r="120" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.1" />
          </svg>
        );
      default: // VAPOR HEADLESS UI
        return (
          <svg className="w-full h-full text-light-text/10" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Volumetric isomorphic glassmorphic boxes */}
            <path d="M200 80 L280 120 L280 200 L200 240 L120 200 L120 120 Z" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
            <path d="M120 120 L200 160 L280 120" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
            <path d="M200 160 L200 240" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
            
            {/* Outline Box Overlay */}
            <path d="M200 50 L310 100 L310 210 L200 260 L90 210 L90 100 Z" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" strokeOpacity="0.3" />
            <circle cx="200" cy="160" r="40" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
          </svg>
        );
    }
  };

  return (
    <div
      id={`project-${project.id}`}
      className="project-card-wrapper w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-14 items-center focus-within:outline-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Column A: Project Canvas Visual Box (Large) */}
      <div
        id={`project-visual-col-${project.id}`}
         className={`lg:col-span-6 w-full relative ${
           isEven ? "lg:order-1" : "lg:order-2"
         }`}
      >
        <div 
          id={`project-frame-${project.id}`}
          className="relative aspect-video sm:aspect-[4/3] md:aspect-video w-full bg-[#0B0B0B] border border-white/10 overflow-hidden flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] custom-card-glow"
          style={{
            borderColor: hovered ? "rgba(255, 255, 255, 0.25)" : "rgba(255, 255, 255, 0.08)",
            transform: hovered ? "scale(1.02) translateY(-4px)" : "scale(1) translateY(0)",
          }}
        >
          {/* Subtle noise mesh on grid inside card */}
          <div className="absolute inset-0 grid-overlay opacity-15" />
          
          {/* Index Counter Indicator */}
          <div className="absolute top-6 left-6 font-mono text-[10px] tracking-widest text-[#F5F5F5]/40 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#F5F5F5] rounded-full animate-pulse" />
            CASE STUDY {project.id}
          </div>

          <div className="absolute top-6 right-6 font-mono text-[10px] text-soft-grey/40">
            [ {project.year} ]
          </div>

          {/* Core Custom Illustration Vector */}
          <div 
            className="w-full h-full p-12 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: hovered ? "scale(1.08)" : "scale(1)",
              opacity: hovered ? "1" : "0.75"
            }}
          >
            {renderVectorIllustration(project.id)}
          </div>

          {/* Technical Corner Bounds */}
          <div className="absolute top-3 left-3 w-1.5 h-1.5 border-t border-l border-white/20" />
          <div className="absolute top-3 right-3 w-1.5 h-1.5 border-t border-r border-white/20" />
          <div className="absolute bottom-3 left-3 w-1.5 h-1.5 border-b border-l border-white/20" />
          <div className="absolute bottom-3 right-3 w-1.5 h-1.5 border-b border-r border-white/20" />
        </div>
      </div>

      {/* Column B: Project Description Case notes */}
      <div
        id={`project-meta-col-${project.id}`}
        className={`lg:col-span-6 flex flex-col justify-center text-left ${
          isEven ? "lg:order-2 lg:pl-6" : "lg:order-1 lg:pr-6"
        }`}
      >
        {/* Project Meta Metrics */}
        <div className="flex items-center gap-2 mb-4 font-mono text-[10px] text-soft-grey tracking-widest">
          <span>{project.subtitle}</span>
        </div>

        {/* Dynamic Shift Title */}
        <h3 
          className="text-2xl sm:text-3.5xl md:text-4xl font-syne font-extrabold tracking-tight text-light-text mb-6 uppercase flex items-center gap-3 transition-transform duration-500 ease-out"
          style={{
            transform: hovered ? "translateX(6px)" : "translateX(0)"
          }}
        >
          {project.title}
        </h3>

        {/* Primary Description */}
        <p className="text-soft-grey font-sans font-light text-sm md:text-base leading-relaxed mb-6 select-text">
          {project.longDescription}
        </p>

        {/* Tags Matrix */}
        <div className="flex flex-wrap gap-2 mb-8 font-mono">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[10px] border border-white/5 bg-white/[0.015] text-[#A1A1A1] hover:text-[#F5F5F5] hover:border-white/15 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Interactive Action Links */}
        <div className="flex items-center gap-6">
          <a
            id={`project-demo-btn-${project.id}`}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-xs font-mono text-light-text tracking-widest hover:text-soft-grey transition-colors"
          >
            <Monitor className="w-3.5 h-3.5" />
            LAUNCH APP
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <a
            id={`project-git-btn-${project.id}`}
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-xs font-mono text-soft-grey tracking-widest hover:text-light-text transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            SOURCE CODE
          </a>
        </div>
      </div>
    </div>
  );
}
