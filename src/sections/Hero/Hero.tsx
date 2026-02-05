import React from "react";
import NavBar from "../../components/NavBar";
import VerticalSocialBar from "../../components/VerticalSocialBar";
import SplashCursor from "../../components/SplashCursor";

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
      <span
        className="hidden md:block absolute top-1/2 right-8 -translate-y-1/2 text-gray-600 text-lg tracking-widest"
        style={{
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
        }}
      >
        Liam Jack Rogers
      </span>
      <div className="flex-1 flex flex-col items-start justify-start pt-16 md:pt-32 text-left px-16 md:px-48 w-full max-w-5xl">
        <span
          className="text-3xl md:text-4xl mb-4 text-gray-600"
          style={{ fontFamily: "'Herr Von Muellerhoff', cursive" }}
        >
          Hi, I'm Liam.
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-black">
          Full Stack Software Engineer
        </h1>
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
