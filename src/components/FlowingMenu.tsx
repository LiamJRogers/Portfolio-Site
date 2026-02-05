import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

interface MenuSubItem {
  text: string;
  image: string;
}

interface MenuItemData {
  text: string;
  image?: string;
  subItems?: MenuSubItem[];
}

interface FlowingMenuProps {
  items?: MenuItemData[];
  speed?: number;
  textColor?: string;
  bgColor?: string;
  marqueeBgColor?: string;
  marqueeTextColor?: string;
  borderColor?: string;
}

interface MenuItemProps extends MenuItemData {
  speed: number;
  textColor: string;
  marqueeBgColor: string;
  marqueeTextColor: string;
  borderColor: string;
  isFirst: boolean;
  isTouch: boolean;
  active: boolean;
  onHover: (hovered: boolean) => void;
}

function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const check = () =>
      !!(
        typeof window !== "undefined" &&
        ("ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          // @ts-ignore
          navigator.msMaxTouchPoints > 0)
      );
    setIsTouch(check());
    window.addEventListener("resize", () => setIsTouch(check()));
    return () =>
      window.removeEventListener("resize", () => setIsTouch(check()));
  }, []);
  return isTouch;
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({
  items = [],
  speed = 15,
  textColor = "#fff",
  bgColor = "#060010",
  marqueeBgColor = "#fff",
  marqueeTextColor = "#060010",
  borderColor = "#fff",
}) => {
  const isTouch = useIsTouchDevice();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!isTouch) return;
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      let minDist = Infinity;
      let closestIdx: number | null = null;
      itemRefs.current.forEach((node, idx) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const dist = Math.abs(itemCenter - viewportCenter);
        if (dist < minDist) {
          minDist = dist;
          closestIdx = idx;
        }
      });
      if (closestIdx !== null) setActiveIdx(closestIdx);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isTouch, items.length]);

  return (
    <div
      className="w-full h-full overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <nav className="flex flex-col h-full m-0 p-0">
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            {...item}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
            isFirst={idx === 0}
            isTouch={isTouch}
            active={isTouch ? activeIdx === idx : hoveredIdx === idx}
            onHover={(hovered) => setHoveredIdx(hovered ? idx : null)}
            ref={(el) => {
              itemRefs.current[idx] = el;
            }}
          />
        ))}
      </nav>
    </div>
  );
};

const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
  (
    {
      text,
      image,
      subItems = [],
      speed,
      textColor,
      marqueeBgColor,
      marqueeTextColor,
      borderColor,
      isFirst,
      isTouch,
      active,
      onHover,
    },
    ref,
  ) => {
    const itemRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const marqueeInnerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<gsap.core.Tween | null>(null);
    const [repetitions, setRepetitions] = useState(4);

    const lastEdge = useRef<"top" | "bottom">("bottom");

    const animationDefaults = { duration: 0.6, ease: "expo" };

    const findClosestEdge = (
      mouseX: number,
      mouseY: number,
      width: number,
      height: number,
    ): "top" | "bottom" => {
      const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
      const bottomEdgeDist =
        Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
      return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
    };

    useEffect(() => {
      const calculateRepetitions = () => {
        if (!marqueeInnerRef.current) return;
        const marqueeContent = marqueeInnerRef.current.querySelector(
          ".marquee-part",
        ) as HTMLElement;
        if (!marqueeContent) return;
        const contentWidth = marqueeContent.offsetWidth;
        const viewportWidth = window.innerWidth;
        const needed = Math.ceil(viewportWidth / contentWidth) + 2;
        setRepetitions(Math.max(4, needed));
      };

      calculateRepetitions();
      window.addEventListener("resize", calculateRepetitions);
      return () => window.removeEventListener("resize", calculateRepetitions);
    }, [text, image, subItems]);

    const marqueeParts =
      active && subItems.length > 0 ? subItems : [{ text, image }];

    const subItemSpeed = 90;
    const marqueeSpeed = active && subItems.length > 0 ? subItemSpeed : speed;

    useEffect(() => {
      const setupMarquee = () => {
        if (!marqueeInnerRef.current) return;

        const totalWidth = marqueeInnerRef.current.offsetWidth;
        if (totalWidth === 0) return;

        gsap.set(marqueeInnerRef.current, { x: 0 });

        if (animationRef.current) {
          animationRef.current.kill();
        }

        animationRef.current = gsap.to(marqueeInnerRef.current, {
          x: -totalWidth,
          duration: marqueeSpeed,
          ease: "none",
          repeat: -1,
        });
      };

      const timer = setTimeout(setupMarquee, 50);
      return () => {
        clearTimeout(timer);
        if (animationRef.current) {
          animationRef.current.kill();
        }
      };
    }, [repetitions, marqueeSpeed, marqueeParts]);

    useEffect(() => {
      if (!marqueeRef.current || !marqueeInnerRef.current) return;

      gsap.killTweensOf([marqueeRef.current, marqueeInnerRef.current]);

      let inFrom: "top" | "bottom" = "bottom";
      let outTo: "top" | "bottom" = "top";

      if (!isTouch) {
        inFrom = lastEdge.current;
        outTo = lastEdge.current === "top" ? "bottom" : "top";
      }

      if (active) {
        gsap
          .timeline({ defaults: animationDefaults })
          .set(
            marqueeRef.current,
            { y: inFrom === "top" ? "-101%" : "101%" },
            0,
          )
          .set(
            marqueeInnerRef.current,
            { y: inFrom === "top" ? "101%" : "-101%" },
            0,
          )
          .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" }, 0);
      } else {
        gsap.set(marqueeRef.current, { y: outTo === "top" ? "-101%" : "101%" });
        gsap.set(marqueeInnerRef.current, {
          y: outTo === "top" ? "101%" : "-101%",
        });
      }
    }, [active, animationDefaults, isTouch]);

    const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
      if (isTouch) return;
      if (!itemRef.current) return;
      const rect = itemRef.current.getBoundingClientRect();
      lastEdge.current = findClosestEdge(
        ev.clientX - rect.left,
        ev.clientY - rect.top,
        rect.width,
        rect.height,
      );
      onHover(true);
    };

    const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
      if (isTouch) return;
      if (!itemRef.current) return;
      const rect = itemRef.current.getBoundingClientRect();
      lastEdge.current = findClosestEdge(
        ev.clientX - rect.left,
        ev.clientY - rect.top,
        rect.width,
        rect.height,
      );
      onHover(false);
    };

    return (
      <div
        className="flex-1 relative overflow-hidden text-center"
        ref={(node) => {
          itemRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref)
            (ref as React.MutableRefObject<HTMLDivElement | null>).current =
              node;
        }}
        style={{ borderTop: isFirst ? "none" : `1px solid ${borderColor}` }}
      >
        <a
          className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-semibold text-[4vh]"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ color: textColor }}
          tabIndex={0}
        >
          {text}
        </a>
        <div
          className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none translate-y-[101%]"
          ref={marqueeRef}
          style={{ backgroundColor: marqueeBgColor }}
        >
          <div className="h-full w-fit flex" ref={marqueeInnerRef}>
            {[...Array(repetitions)].map((_, idx) =>
              marqueeParts.map((part, subIdx) => (
                <div
                  className="marquee-part flex items-center shrink-0"
                  key={`${idx}-${subIdx}`}
                  style={{ color: marqueeTextColor }}
                >
                  <span className="whitespace-nowrap uppercase font-normal text-[4vh] leading-none px-[1vw]">
                    {part.text}
                  </span>
                  <div
                    className="w-16 h-16 flex items-center justify-centere rounded-lg shadow mr-6 md:mr-[1vw] ml-6 md:ml-[1vw]"
                    style={{
                      backgroundImage: `url(${part.image})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  />
                </div>
              )),
            )}
          </div>
        </div>
      </div>
    );
  },
);

export default FlowingMenu;
