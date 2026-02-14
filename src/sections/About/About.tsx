import { useEffect, useState } from "react";
import Lanyard from "../../components/Lanyard";
import { motion } from "motion/react";

function useIsMobile(breakpoint = 768) {
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

  const before = `My name is Liam Jack Rogers, a ${age}-year-old Software Engineer with a Bachelor of Science (Hons) in Software Engineering from `;
  const link = "Liverpool John Moores University";
  const after = ".";

  const fullText = before + link + after;
  const linkStart = before.length;
  const linkEnd = before.length + link.length;

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col md:flex-row items-stretch justify-end px-6 md:px-0 bg-gray-50 relative"
      onMouseEnter={() => setCursorActive(true)}
      onMouseLeave={() => {
        setCursorActive(false);
        setInvert(false);
      }}
    >
      <div className="block md:absolute md:inset-0 md:z-10 md:pointer-events-auto w-full h-75 md:h-full">
        <Lanyard
          position={[0, 0, 20]}
          gravity={[0, -40, 0]}
          fov={lanyardFov}
          setInvert={setInvert}
        />
      </div>
      <div className="hidden md:block flex-1" />
      <div
        className="flex-1 max-w-2xl w-full text-left md:text-left relative z-20 flex flex-col justify-center items-start pr-0 md:pr-28 pt-8 md:pt-0"
        style={{
          background: "transparent",
          fontFamily: "'Hind Vadodara', sans-serif",
        }}
      >
        <motion.h2
          className="text-6xl md:text-7xl font-bold mb-6 text-black"
          style={{ fontFamily: "'Nothing You Could Do', sans-serif" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          About Me
        </motion.h2>
        <div
          className="text-lg md:text-2xl text-gray-700 mb-4"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {Array.from(fullText).map((char, i) =>
            i >= linkStart && i < linkEnd ? (
              <motion.a
                key={i}
                href="https://www.ljmu.ac.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 underline hover:text-gray-800 transition"
                style={{
                  fontFamily: "'Koulen', sans-serif",
                  display: "inline",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.01 * i, duration: 0.2 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                {char}
              </motion.a>
            ) : (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.01 * i, duration: 0.2 }}
                style={{ display: "inline-block" }}
                viewport={{ once: true, amount: 0.5 }}
              >
                {char}
              </motion.span>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
