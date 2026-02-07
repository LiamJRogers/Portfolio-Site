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
      <h2 className="mb-8 px-4 text-5xl font-bold tracking-wide leading-tight">
        Technologies
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
