import { useState, useEffect, useRef } from "react";
import CursorTrail from "./components/CursorTrail";
import Hero from "./sections/Hero/Hero";
import About from "./sections/About/About";
import Technologies from "./sections/About/Technologies";
import Projects from "./sections/Projects/Projects";
import Footer from "./sections/Footer/Footer";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
  const [cursorActive, setCursorActive] = useState(false);
  const [cardHover, setCardHover] = useState(false);
  const [invert, setInvert] = useState(false);
  const smootherRef = useRef<any>(null);

  useEffect(() => {
    if (!smootherRef.current) {
      smootherRef.current = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 3,
        effects: true,
        normalizeScroll: true,
      });
    }
    return () => {
      if (smootherRef.current) {
        smootherRef.current.kill();
        smootherRef.current = null;
      }
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <CursorTrail
        active={cursorActive}
        cardHover={cardHover}
        invert={invert}
      />
      <div id="smooth-content">
        <main>
          <Hero />
          <About setCursorActive={setCursorActive} setInvert={setInvert} />
          <Technologies
            setCursorActive={setCursorActive}
            setInvert={setInvert}
          />
          <Projects
            setCursorActive={setCursorActive}
            setCardHover={setCardHover}
          />
          <Footer setCursorActive={setCursorActive} setInvert={setInvert} />
        </main>
      </div>
    </div>
  );
}

export default App;
