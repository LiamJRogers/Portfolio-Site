import { useEffect, useState } from "react";
import Lanyard from "../../components/Lanyard";
import { motion } from "motion/react";

function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false,
  );
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}

const About = ({
  setCursorActive,
  setInvert,
}: {
  setCursorActive: (active: boolean) => void;
  setInvert: (invert: boolean) => void;
}) => {
  const isMobile = useIsMobile();
  const lanyardFov = isMobile ? 23 : 15;

  const birthYear = 2003;
  const birthMonth = 3;
  const now = new Date();
  let age = now.getFullYear() - birthYear;
  if (now.getMonth() + 1 < birthMonth) {
    age -= 1;
  }

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col lg:flex-row items-stretch lg:items-center lg:justify-center px-6 lg:px-0 relative rounded-t-4xl"
      style={{ background: "#1E1E1E" }}
      onMouseEnter={() => {
        setCursorActive(true);
        setInvert(true);
      }}
      onMouseLeave={() => {
        setCursorActive(false);
        setInvert(false);
      }}
    >
      <div className="flex-[1.5] min-w-0 flex flex-col justify-start items-start relative z-10">
        {!isMobile && (
          <>
            <span
              className="text-white text-2xl font-semibold mb-2 drop-shadow-lg rotate-[-10deg] self-center"
              style={{
                fontFamily: "'Nothing You Could Do', sans-serif",
                letterSpacing: "0.03em",
                lineHeight: 1.1,
                textShadow: "0 2px 8px rgba(0,0,0,0.25)",
                display: "inline-block",
              }}
            >
              Drag me!
            </span>
            <svg
              width="120"
              height="90"
              viewBox="0 0 120 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white self-center"
              style={{ marginTop: "-8px", transform: "rotate(-10deg)" }}
            >
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="6"
                  markerHeight="6"
                  refX="3"
                  refY="3"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <polygon
                    points="0 0, 6 3, 0 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </marker>
              </defs>
              <path
                d="M60 10 Q45 40 80 60"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                markerEnd="url(#arrowhead)"
              />
            </svg>
          </>
        )}
      </div>
      <div className="flex-2 min-w-0 h-screen relative z-10 flex items-center justify-center">
        <div className="w-full h-full invisible" aria-hidden="true" />
      </div>
      <div
        className="flex-2 min-w-0 w-full text-left lg:text-left relative flex flex-col justify-start items-start pr-0 lg:pr-28 pt-8 lg:pt-0 z-10"
        style={{
          background: "transparent",
          fontFamily: "'Hind Vadodara', sans-serif",
        }}
      >
        <motion.h2
          className="text-6xl lg:text-7xl font-bold mb-6 text-white"
          style={{ fontFamily: "'Nothing You Could Do', sans-serif" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          About Me
        </motion.h2>
        <motion.p
          className="text-lg lg:text-2xl text-white mb-4"
          style={{ fontFamily: "'Hind Vadodara', sans-serif" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          My name is Liam Jack Rogers, a {age}-year-old Software Engineer with a
          Bachelor of Science (Hons) in Software Engineering from{" "}
          <a
            href="https://www.ljmu.ac.uk/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline hover:text-gray-200 transition"
            style={{ fontFamily: "'Koulen', sans-serif" }}
          >
            Liverpool John Moores University
          </a>
          .
        </motion.p>
      </div>
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="w-full h-full pointer-events-auto">
          <Lanyard
            key={lanyardFov}
            position={[0, 0, 20]}
            gravity={[0, -40, 0]}
            fov={lanyardFov}
            setInvert={setInvert}
          />
        </div>
      </div>
    </section>
  );
};
export default About;
