import FlowingMenu from "../../components/FlowingMenu";
import { technologies } from "../../data/technologies";

function Technologies({
  setCursorActive,
  setInvert,
}: {
  setCursorActive: (active: boolean) => void;
  setInvert: (invert: boolean) => void;
}) {
  return (
    <section
      className="relative py-8"
      onMouseEnter={() => setCursorActive(true)}
      onMouseLeave={() => {
        setCursorActive(false);
        setInvert(false);
      }}
    >
      <h2
        className="text-6xl md:text-7xl font-bold mb-6 text-black p-12 text-center md:text-left"
        style={{ fontFamily: "'Koulen', sans-serif" }}
      >
        Tools of the Trade
      </h2>
      <div
        className="h-150 relative"
        onMouseEnter={() => setInvert(true)}
        onMouseLeave={() => setInvert(false)}
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
      </div>
    </section>
  );
}

export default Technologies;
