import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import modules
import CustomCursor from "./components/CustomCursor";
import NoiseOverlay from "./components/NoiseOverlay";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Education from "./components/Education";
import GetInTouch from "./components/GetInTouch";
import Footer from "./components/Footer";
import NotFoundPage from "./components/NotFoundPage";


// Register ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [showPortfolio, setShowPortfolio] = useState(true);

  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
  if (pathname !== "/") {
    return <NotFoundPage path={pathname} />;
  }

  return (
    <div className="relative min-h-screen bg-matte-black text-light-text font-sans selection:bg-light-text selection:text-matte-black w-full overflow-hidden">
      <CustomCursor />
      <NoiseOverlay />

      <main id="main-content">
        <Hero />
        <Projects />
        <Skills />
        <Education />
        <GetInTouch />
      </main>

      <Footer />
    </div>
  );
}
