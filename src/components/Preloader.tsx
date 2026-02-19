import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const name = [
  { letter: "L", key: "L" },
  { letter: "i", key: "i" },
  { letter: "a", key: "a" },
  { letter: "m", key: "m" },
  { letter: " ", key: "space1" },
  { letter: "J", key: "J" },
  { letter: "a", key: "a2" },
  { letter: "c", key: "c" },
  { letter: "k", key: "k" },
  { letter: " ", key: "space2" },
  { letter: "R", key: "R" },
  { letter: "o", key: "o" },
  { letter: "g", key: "g" },
  { letter: "e", key: "e" },
  { letter: "r", key: "r" },
  { letter: "s", key: "s" },
];

const NAV_LJR_OFFSET = { x: -55, y: 20 };

const Preloader: React.FC<{ onFinish?: () => void }> = ({ onFinish }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    letterRefs.current.forEach((ref, i) => {
      if (!ref) return;
      if (i !== 0 && i !== 5 && i !== 10) {
        gsap.to(ref, {
          opacity: 0,
          duration: 0.6,
          delay: 1,
          ease: "power2.inOut",
        });
      }
    });

    const moveTogether = () => {
      const l = letterRefs.current[0];
      const j = letterRefs.current[5];
      const r = letterRefs.current[10];

      if (l && j && r && textWrapperRef.current) {
        const lRect = l.getBoundingClientRect();
        const jRect = j.getBoundingClientRect();
        const rRect = r.getBoundingClientRect();
        const wrapperRect = textWrapperRef.current.getBoundingClientRect();
        const centerX = wrapperRect.left + wrapperRect.width / 2;
        const centerY = wrapperRect.top + wrapperRect.height / 2;
        const totalWidth = lRect.width + jRect.width + rRect.width;
        const startX = centerX - totalWidth / 2;

        gsap.to(l, {
          x: startX - lRect.left,
          y: centerY - lRect.top - lRect.height / 2,
          duration: 0.7,
          ease: "power3.inOut",
        });
        gsap.to(j, {
          x: startX + lRect.width - jRect.left,
          y: centerY - jRect.top - jRect.height / 2,
          duration: 0.7,
          ease: "power3.inOut",
        });
        gsap.to(r, {
          x: startX + lRect.width + jRect.width - rRect.left,
          y: centerY - rRect.top - rRect.height / 2,
          duration: 0.7,
          ease: "power3.inOut",
          onComplete: splitScreen,
        });
      }
    };

    const splitScreen = () => {
      if (textWrapperRef.current) {
        gsap.to(textWrapperRef.current, {
          top: NAV_LJR_OFFSET.y,
          left: NAV_LJR_OFFSET.x,
          width: "auto",
          height: "auto",
          transform: "translate(0,0)",
          duration: 0.7,
          ease: "power3.inOut",
        });
      }

      const tl = gsap.timeline();

      const textSpan = textWrapperRef.current?.firstChild as HTMLElement;
      if (textSpan) {
        tl.to(
          textSpan,
          {
            color: "#000",
            duration: 0.8,
            ease: "power3.inIn",
            delay: 0.4,
          },
          0,
        );
      }

      tl.to(
        topRef.current,
        {
          x: "-100vw",
          duration: 0.9,
          ease: "power3.inIn",
        },
        0,
      ).to(
        bottomRef.current,
        {
          x: "100vw",
          duration: 0.9,
          ease: "power3.inIn",
          onComplete: () => {
            setShow(false);
            if (onFinish) onFinish();
          },
        },
        0,
      );

      if (textWrapperRef.current) {
        tl.to(textWrapperRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    };

    setTimeout(moveTogether, 1800);
  }, [onFinish]);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <div
        ref={topRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "50vh",
          background: "#1E1E1E",
        }}
      />
      <div
        ref={bottomRef}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100vw",
          height: "50vh",
          background: "#1E1E1E",
        }}
      />
      <div
        ref={textWrapperRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: "'Koulen', sans-serif",
            fontSize: "1.875rem",
            fontWeight: 700,
            letterSpacing: "0",
            color: "#fff",
            display: "flex",
            gap: "0",
          }}
        >
          {name.map((item, i) => (
            <span
              key={item.key}
              ref={(el) => (letterRefs.current[i] = el)}
              style={{
                display: "inline-block",
                transition: "opacity 0.6s",
                minWidth: item.letter === " " ? "0.5em" : undefined,
              }}
            >
              {item.letter}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};

export default Preloader;
