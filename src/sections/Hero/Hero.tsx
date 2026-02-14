import React from "react";
import NavBar from "../../components/NavBar";
import VerticalSocialBar from "../../components/VerticalSocialBar";
import SplashCursor from "../../components/SplashCursor";
import { motion } from "motion/react";
import TextReveal from "../../components/TextReveal";

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

const Hero = () => {
  const isDesktop = useIsDesktop();

  return (
    <section className="min-h-screen flex flex-col relative overflow-hidden">
      <NavBar />
      <VerticalSocialBar />
      {isDesktop && (
        <SplashCursor className="pointer-events-none absolute inset-0 z-0" />
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
              whileInView={{ opacity: 1, y: 0 }}
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
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-6xl md:text-8xl font-bold text-black"
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
      <a
        href="#next-section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        aria-label="Scroll down"
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-600 animate-bounce"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <polyline points="19 12 12 19 5 12" />
        </svg>
      </a>
    </section>
  );
};

export default Hero;
