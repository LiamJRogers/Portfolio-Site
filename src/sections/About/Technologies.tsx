import FlowingMenu from "../../components/FlowingMenu";
import { technologies } from "../../data/technologies";
import { motion } from "motion/react";

function Technologies({
  setCursorActive,
  setInvert,
}: {
  setCursorActive: (active: boolean) => void;
  setInvert: (invert: boolean) => void;
}) {
  return (
    <section
      className="relative py-8 bg-white"
      onMouseEnter={() => setCursorActive(true)}
      onMouseLeave={() => {
        setCursorActive(false);
        setInvert(false);
      }}
    >
      <motion.h2
        className="text-6xl md:text-7xl font-bold mb-6 text-black p-12 text-center md:text-left"
        style={{ fontFamily: "'Koulen', sans-serif" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        Tools of the Trade
      </motion.h2>
      <motion.div
        className="h-150 relative"
        onMouseEnter={() => setInvert(true)}
        onMouseLeave={() => setInvert(false)}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <FlowingMenu
          items={technologies}
          speed={15}
          textColor="#060010"
          bgColor="#ffffff"
          marqueeBgColor="#060010"
          marqueeTextColor="#ffffff"
          borderColor="#060010"
        />
      </motion.div>
    </section>
  );
}

export default Technologies;
