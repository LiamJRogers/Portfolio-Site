import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CIRCLE_SIZE = 34;
const CIRCLE_SIZE_HOVER = 84;

const CursorTrail: React.FC<{
  active: boolean;
  cardHover?: boolean;
  invert?: boolean;
}> = ({ active, cardHover = false, invert = false }) => {
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!active) return;
      const size = cardHover ? CIRCLE_SIZE_HOVER : CIRCLE_SIZE;
      const x = e.clientX - size / 2;
      const y = e.clientY - size / 2;
      if (circleRef.current) {
        gsap.to(circleRef.current, {
          x,
          y,
          width: size,
          height: size,
          duration: 0.35,
          ease: "power2.out",
        });
      }
    };

    if (active) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [active, cardHover]);

  useEffect(() => {
    if (circleRef.current) {
      gsap.to(circleRef.current, {
        background: cardHover ? (invert ? "#fff" : "#000") : "transparent",
        border: cardHover
          ? invert
            ? "2px solid #fff"
            : "2px solid #000"
          : invert
            ? "2px solid #fff"
            : "2px solid #000",
        opacity: active ? 0.7 : 0,
        duration: 0.2,
      });
    }
  }, [cardHover, active, invert]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 40,
      }}
    >
      <div
        ref={circleRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: cardHover ? CIRCLE_SIZE_HOVER : CIRCLE_SIZE,
          height: cardHover ? CIRCLE_SIZE_HOVER : CIRCLE_SIZE,
          borderRadius: "50%",
          background: cardHover ? (invert ? "#fff" : "#000") : "transparent",
          border: cardHover
            ? invert
              ? "2px solid #fff"
              : "2px solid #000"
            : invert
              ? "2px solid #fff"
              : "2px solid #000",
          pointerEvents: "none",
          zIndex: 50,
          opacity: active ? 0.7 : 0,
          transition: "opacity 0.2s",
          boxShadow: "0 2px 16px 0 rgba(0,0,0,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {cardHover && (
          <svg
            width={32}
            height={32}
            viewBox="0 0 24 24"
            fill="none"
            stroke={invert ? "#000" : "#fff"}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ margin: "auto" }}
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default CursorTrail;
