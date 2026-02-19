import { useState, useEffect, useRef } from "react";
import CursorTrail from "./components/CursorTrail";
import Hero from "./sections/Hero/Hero";
import About from "./sections/About/About";
import Technologies from "./sections/About/Technologies";
import Projects from "./sections/Projects/Projects";
import Preloader from "./components/Preloader";
import Footer from "./sections/Footer/Footer";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
  const [cursorActive, setCursorActive] = useState(false);
  const [cardHover, setCardHover] = useState(false);
  const [invert, setInvert] = useState(false);
  const [loading, setLoading] = useState(true); // <-- Add loading state
  const smootherRef = useRef<any>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && !smootherRef.current) {
      smootherRef.current = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 3,
        effects: true,
        normalizeScroll: true,
      });
    }

    let heroTrigger: ScrollTrigger | undefined;
    let heroOpacityTween: gsap.core.Tween | undefined;
    let footerUncoverTimeline: gsap.core.Timeline | undefined;

    if (heroRef.current && aboutRef.current) {
      heroTrigger = ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        endTrigger: aboutRef.current,
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        scrub: true,
      });

      heroOpacityTween = gsap.to(heroRef.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: true,
        },
      });
    }

    if (footerRef.current && projectsRef.current) {
      gsap.set(footerRef.current, { yPercent: -50 });

      footerUncoverTimeline = gsap
        .timeline({
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "bottom bottom",
            end: "+=75%",
            scrub: true,
          },
        })
        .to(footerRef.current, { yPercent: 0, ease: "none" });
    }

    return () => {
      if (smootherRef.current) {
        smootherRef.current.kill();
        smootherRef.current = null;
      }
      if (heroTrigger) heroTrigger.kill();
      if (heroOpacityTween) heroOpacityTween.kill();
      if (footerUncoverTimeline) footerUncoverTimeline.kill();
    };
  }, [loading]);

  return (
    <>
      {loading && <Preloader onFinish={() => setLoading(false)} />}
      {!loading && (
        <div id="smooth-wrapper">
          <CursorTrail
            active={cursorActive}
            cardHover={cardHover}
            invert={invert}
          />
          <div id="smooth-content">
            <main>
              <div ref={heroRef}>
                <Hero />
              </div>
              <div ref={aboutRef}>
                <About
                  setCursorActive={setCursorActive}
                  setInvert={setInvert}
                />
              </div>
              <Technologies
                setCursorActive={setCursorActive}
                setInvert={setInvert}
              />
              <div
                ref={projectsRef}
                style={{ zIndex: 2, position: "relative" }}
              >
                <Projects
                  setCursorActive={setCursorActive}
                  setCardHover={setCardHover}
                />
              </div>
              <div ref={footerRef} style={{ zIndex: 1, position: "relative" }}>
                <Footer
                  setCursorActive={setCursorActive}
                  setInvert={setInvert}
                />
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
