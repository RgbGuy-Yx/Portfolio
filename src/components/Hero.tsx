import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown, Code2, Cpu, Briefcase, Award, GraduationCap, GitPullRequest, Database, Brain, Terminal, Smartphone } from "lucide-react";
import { TIMELINE, SKILL_CATEGORIES } from "../data";
import RadialOrbitalTimeline from "./ui/radial-orbital-timeline";
import Navbar from "./Navbar";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef1 = useRef<HTMLDivElement>(null);
  const headingRef2 = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const abstractRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  // Spotlight Mouse Track
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      containerRef.current.style.setProperty("--mouse-x", `${x}px`);
      containerRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states for elements
      gsap.set([headingRef1.current, headingRef2.current], { y: "130%" });
      gsap.set(textRef.current, { opacity: 0, y: 30 });
      gsap.set(ctaRef.current, { opacity: 0, y: 30 });
      gsap.set(abstractRef.current, { opacity: 0, scale: 0.96, filter: "blur(5px)" });
      gsap.set(badgesRef.current, { opacity: 0, x: -20 });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.to([headingRef1.current, headingRef2.current], {
        y: "0%",
        duration: 1.4,
        stagger: 0.15,
        delay: 0.2, // leave some space for page loading
      })
      .to(badgesRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
      }, "-=0.8")
      .to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
      }, "-=0.7")
      .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
      }, "-=0.8")
      .to(abstractRef.current, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.6,
      }, "-=1.4");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSmoothScroll = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  // Convert skill categories data to orbit-nodes configuration format
  const mappedTimelineData = SKILL_CATEGORIES.map((category, index) => {
    const lowerTitle = category.title.toLowerCase();
    let IconComponent = Code2;
    
    if (lowerTitle.includes("frontend")) IconComponent = Code2;
    else if (lowerTitle.includes("backend")) IconComponent = Cpu;
    else if (lowerTitle.includes("database")) IconComponent = Database;
    else if (lowerTitle.includes("agentic")) IconComponent = Brain;
    else if (lowerTitle.includes("ide")) IconComponent = Terminal;
    else if (lowerTitle.includes("mobile") || lowerTitle.includes("pipeline")) IconComponent = Smartphone;

    // Connect node sequence in a beautiful circular ring network
    const currentId = index + 1;
    const prevId = index === 0 ? SKILL_CATEGORIES.length : index;
    const nextId = index === SKILL_CATEGORIES.length - 1 ? 1 : index + 2;
    const relatedIds = [prevId, nextId];

    // Energy represents category completeness/glow intensity
    let energy = 90;
    if (lowerTitle.includes("frontend")) energy = 95;
    else if (lowerTitle.includes("ide")) energy = 100;
    else if (lowerTitle.includes("agentic")) energy = 95;
    else if (lowerTitle.includes("database")) energy = 85;

    // Compile skills string for popover
    const skillsList = category.skills.map(s => s.name).join(", ");

    return {
      id: currentId,
      title: category.title,
      date: lowerTitle.includes("frontend") ? "CLIENT" : lowerTitle.includes("backend") ? "SERVER" : lowerTitle.includes("database") ? "DATA" : lowerTitle.includes("agentic") ? "AI AGENTS" : lowerTitle.includes("ide") ? "AI TOOLS" : "MOBILE/DEVOPS",
      content: `Specialized in: ${skillsList}.`,
      category: "Tech Stack",
      icon: IconComponent,
      relatedIds,
      status: "completed" as const,
      energy,
    };
  });

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 xl:px-24 bg-[#0B0B0B] overflow-hidden select-none"
    >
      <Navbar />
      {/* 1. Background Visual Layers */}
      <div id="hero-grid" className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
      <div id="hero-spotlight" className="absolute inset-0 spotlight-radial pointer-events-none" />
      
      {/* 2. Content Layout Grid (Split screen on large screens) */}
      <div id="hero-layout" className="flex-1 grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-16 z-10 w-full max-w-7xl mx-auto">
        
        {/* Left Column: Massive Typography */}
        <div id="hero-left-col" className="lg:col-span-6 flex flex-col justify-center text-left max-w-2xl">
          
          {/* Subtle Badges of Roles */}
          <div ref={badgesRef} className="flex flex-wrap gap-2.5 mb-7 md:mb-9">
            <span className="flex items-center gap-1.5 px-3 py-1 border border-white/5 bg-white/[0.02] rounded-full text-[10px] font-mono tracking-widest text-[#F5F5F5]">
              <Cpu className="w-3 h-3 text-soft-grey" />
               AI FULL STACK DEVELOPER
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 border border-white/5 bg-white/[0.02] rounded-full text-[10px] font-mono tracking-widest text-soft-grey">
              <Code2 className="w-3 h-3 text-soft-grey" />
              AI + AUTOMATION SYSTEMS
            </span>
          </div>

          {/* Huge Main Headings */}
          <h1 id="hero-title" className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-display font-extrabold tracking-tight text-light-text mb-5 md:mb-6 flex flex-col gap-2 md:gap-3 leading-none">
            <div className="reveal-wrapper">
              <div ref={headingRef1} className="char-reveal select-text">
                Hey, I am Yuvraj
              </div>
            </div>
            <div className="reveal-wrapper">
              <div ref={headingRef2} className="char-reveal select-text outline-text">
                 AI Full Stack Developer
              </div>
            </div>
          </h1>

          {/* Intro Paragraph */}
          <p
            ref={textRef}
            className="text-soft-grey text-base md:text-lg tracking-normal font-sans max-w-xl mb-9 md:mb-11 font-light leading-relaxed select-text"
          >
            I build things on the web and break them to understand them better. Currently working with the AI stack and exploring how systems stay secure.
          </p>

          {/* Call-to-actions */}
          <div ref={ctaRef} className="flex flex-wrap gap-4 items-center">
            <button
              id="hero-view-projects"
              onClick={() => handleSmoothScroll("projects")}
              className="group px-6 md:px-8 py-3.5 bg-[#F5F5F5] text-[#0B0B0B] hover:bg-[#F5F5F5]/90 rounded-none text-xs font-mono tracking-widest transition-all duration-300 flex items-center gap-2 border border-transparent shadow-[0_10px_30px_rgba(255,255,255,0.05)] cursor-pointer"
            >
              VIEW PROJECTS
              <span className="group-hover:translate-x-1 duration-300">→</span>
            </button>
            <button
              id="hero-contact"
              onClick={() => handleSmoothScroll("contact")}
              className="px-6 md:px-8 py-3.5 border border-white/10 hover:border-white/55 text-light-text hover:bg-white/[0.02] rounded-none text-xs font-mono tracking-widest transition-all duration-300 cursor-pointer"
            >
              GET IN TOUCH
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Space Orbital Timeline */}
        <div id="hero-right-col" className="lg:col-span-6 flex justify-center items-center h-full w-full relative z-20">
          <div 
            ref={abstractRef}
            className="relative w-full min-h-[450px] flex items-center justify-center p-4 bg-transparent"
          >
            <RadialOrbitalTimeline timelineData={mappedTimelineData} />
          </div>
        </div>
      </div>

      {/* 3. Bottom Utility Row / Scrolling cue */}
      <div id="hero-bottom-utils" className="w-full max-w-7xl mx-auto flex items-center justify-between z-10 border-t border-white/5 pt-6 text-[10px] font-mono text-soft-grey tracking-wider">
        <div id="hero-coor" className="hidden sm:block">
          LAT: 25.0330° N / LON: 121.5654° E
        </div>
        <div id="hero-utc-clock">
          UTC {new Date().toISOString().replace('T', ' ').substring(0, 19)}
        </div>
        <button
          id="hero-scroll-cue"
          onClick={() => handleSmoothScroll("projects")}
          className="group flex items-center gap-2 hover:text-[#F5F5F5] transition-colors cursor-pointer"
        >
          SCROLL TO EXPLORE
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1.5 transition-transform duration-300" />
        </button>
      </div>
    </section>
  );
}
