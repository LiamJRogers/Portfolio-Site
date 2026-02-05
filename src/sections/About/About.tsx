import { useEffect, useState } from "react";
import Lanyard from "../../components/Lanyard";

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

const About = () => {
  const isMobile = useIsMobile();
  const lanyardFov = isMobile ? 30 : 15;

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
      className="min-h-screen flex flex-col md:flex-row items-stretch justify-end px-6 md:px-0 bg-gray-50 relative"
    >
      <div className="block md:absolute md:inset-0 md:z-10 md:pointer-events-none w-full h-75 md:h-full">
        <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} fov={lanyardFov} />
      </div>
      <div className="hidden md:block flex-1" />
      <div
        className="flex-1 max-w-2xl w-full text-left md:text-left relative z-20 flex flex-col justify-center items-start pr-0 md:pr-34 pt-8 md:pt-0"
        style={{ background: "transparent" }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
          About Me
        </h2>
        <p className="text-lg md:text-xl text-gray-700 mb-4">
          My name is Liam Jack Rogers, a {age}-year-old Software Engineer with a
          Bachelor of Science (Hons) in Software Engineering from{" "}
          <a
            href="https://www.ljmu.ac.uk/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 underline hover:text-gray-800 transition"
          >
            Liverpool John Moores University
          </a>
          .
        </p>
        <p className="text-lg md:text-xl text-gray-700">
          I'm currently working full-time, building and maintaining software
          solutions that solve real-world problems. When I’m not working, you’ll
          find me coding just for the joy of it, trying out the latest tools, or
          building projects that challenge and inspire me.
        </p>
      </div>
    </section>
  );
};

export default About;
