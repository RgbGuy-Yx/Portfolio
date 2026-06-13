import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TIMELINE } from "../data";
import { Compass, Briefcase, Award, GraduationCap, GitPullRequest } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Dynamic scroll vertical timeline progress line
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: true,
          },
        }
      );
    }

    // 2. Section title fade scroll effect
    gsap.fromTo(
      ".timeline-header",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".timeline-header",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // 3. Stagger-fade in timeline blocks
    const cards = gsap.utils.toArray(".timeline-card-item");
    cards.forEach((card: any) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 45, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="py-24 md:py-36 px-6 md:px-12 xl:px-24 bg-matte-black relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="timeline-header flex flex-col items-start mb-20">
          <div className="flex items-center gap-2 mb-4">
            <Compass className="w-4.5 h-4.5 text-soft-grey" />
            <span className="font-mono text-[9px] tracking-widest text-[#8F8F8F] uppercase">
              CHRONOLOGY & CREDENTIALS
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-light-text mb-6">
            JOURNEY & PATHWAYS
          </h2>
          <div className="h-[1px] w-24 bg-white/20" />
        </div>

        {/* Elegant Minimalist Vertical Progress Timeline */}
        <div className="relative pl-8 sm:pl-12 max-w-4xl mx-auto">
          {/* Light-opacity track guide base */}
          <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-white/[0.04]" />
          
          {/* Active green/white progress highlight */}
          <div 
            ref={lineRef}
            className="absolute left-0 top-2 bottom-2 w-[1px] bg-[#F5F5F5] origin-top shadow-[0_0_8px_#FFF]"
          />

          <div className="flex flex-col gap-12 sm:gap-16">
            {TIMELINE.map((event) => {
              let IconComponent = Briefcase;
              if (event.id === "edu-2") IconComponent = Award;
              if (event.id === "edu-3") IconComponent = GraduationCap;
              if (event.id === "edu-4") IconComponent = GitPullRequest;

              return (
                <div
                  key={event.id}
                  className="timeline-card-item relative group flex flex-col items-start"
                >
                  {/* Outer circle pinpoint alignment on the timeline path */}
                  <div className="absolute -left-8 sm:-left-12 top-1.5 w-3.5 h-3.5 rounded-none bg-[#0B0B0B] border border-white/20 flex items-center justify-center translate-x-[-6.5px] group-hover:border-[#F5F5F5] transition-all duration-500">
                    <div className="w-1 h-1 bg-white/20 group-hover:bg-[#F5F5F5] transition-colors duration-500" />
                  </div>

                  {/* Year Tag */}
                  <span className="font-mono text-[10px] tracking-widest text-white/40 mb-3 group-hover:text-[#F5F5F5] transition-colors duration-500 select-text">
                    {event.year.toUpperCase()}
                  </span>

                  {/* Content Container Panel */}
                  <div className="w-full bg-[#161616]/40 border border-white/[0.03] hover:border-white/[0.12] p-6 md:p-8 transition-all duration-500 rounded-none bg-gradient-to-br from-[#161616]/40 to-[#161616]/10 hover:bg-[#161616]/70">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-base sm:text-lg font-display font-extrabold text-light-text uppercase tracking-wide select-text">
                          {event.title}
                        </h3>
                        <p className="text-xs font-mono text-soft-grey tracking-wide mt-1 uppercase text-white/30 select-text">
                          {event.institution}
                        </p>
                      </div>
                      <div className="w-9 h-9 border border-white/5 bg-white/[0.02] flex items-center justify-center rounded-none text-soft-grey group-hover:text-white group-hover:border-white/10 transition-all duration-500 shrink-0 select-none">
                        <IconComponent className="w-4 h-4 text-white/60" />
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm font-sans text-soft-grey leading-relaxed mb-6 font-light select-text">
                      {event.description}
                    </p>

                    {/* Meta Tags */}
                    <div className="flex flex-wrap gap-1.5 select-none">
                      {event.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 border border-white/[0.04] bg-white/[0.01] text-[9px] font-mono uppercase tracking-widest text-soft-grey/70 hover:text-white/90 hover:border-white/10 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
