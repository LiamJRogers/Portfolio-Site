import React, { lazy, Suspense } from "react";
import NavBar from "../../components/NavBar";
import VerticalSocialBar from "../../components/VerticalSocialBar";
import { motion } from "framer-motion";
import TextReveal from "../../components/TextReveal";

const SplashCursor = lazy(() => import("../../components/SplashCursor"));

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = React.useState(
    typeof window !== "undefined" ? window.innerWidth >= 768 : false,
  );
  React.useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isDesktop;
}

const Hero = ({
  onMenuOpen,
  onMenuClose,
  setCursorActive,
}: {
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  setCursorActive: (active: boolean) => void;
}) => {
  const isDesktop = useIsDesktop();

  const [showArrow, setShowArrow] = React.useState(true);

  React.useEffect(() => {
    const handleResize = () => setShowArrow(window.innerHeight > 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToSection = (id: string) => {
    const selector = `#${id}`;
    const smoother =
      (window as any)._smoother ||
      ((window as any).ScrollSmoother &&
        typeof (window as any).ScrollSmoother.get === "function" &&
        (window as any).ScrollSmoother.get()) ||
      null;

    if (smoother && typeof smoother.scrollTo === "function") {
      try {
        smoother.scrollTo(selector, true, "top");
        setTimeout(() => (window as any).ScrollTrigger?.update?.(), 50);
        return;
      } catch {}
    }

    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="min-h-dvh flex flex-col relative overflow-hidden"
      onMouseEnter={() => setCursorActive(false)}
      onMouseLeave={() => setCursorActive(true)}
    >
      <NavBar onMenuOpen={onMenuOpen} onMenuClose={onMenuClose} />
      <VerticalSocialBar />
      {isDesktop && (
        <Suspense fallback={null}>
          <SplashCursor className="pointer-events-none absolute inset-0 z-0" />
        </Suspense>
      )}
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true, amount: 0.5 }}
        className="hidden md:block absolute top-1/2 right-8 -translate-y-1/2 text-gray-600 text-lg tracking-widest"
        style={{
          writingMode: "vertical-rl",
          fontFamily: "'Hind Vadodara', sans-serif",
        }}
      >
        Liam Jack Rogers
      </motion.span>
      <div className="flex flex-col items-center text-center px-4 md:px-0 w-full max-w-5xl mx-auto pt-16 md:pt-40">
        <span
          className="text-3xl md:text-4xl mb-4 text-gray-600"
          style={{ fontFamily: "'Herr Von Muellerhoff', cursive" }}
        >
          {Array.from("Hi, I'm Liam.").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.04 * i }}
              viewport={{ once: true, amount: 0.5 }}
              style={{ display: "inline-block" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-6xl sm:text-7xl md:text-8xl font-bold text-black"
          style={{ fontFamily: "'Koulen', sans-serif" }}
        >
          Full Stack <br />
          Software Engineer
        </motion.h1>
        <TextReveal
          text="53.4084° N, 2.9916° W"
          revealText="Liverpool, England"
          className="mt-4 text-gray-700"
        />
      </div>
      {showArrow && (
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("about");
          }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer hidden sm:block"
          aria-label="Scroll to About"
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-600 animate-bounce"
            style={{ animationDuration: "1.6s" }}
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
        </a>
      )}
    </section>
  );
};

export default Hero;
