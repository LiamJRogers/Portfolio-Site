import React from "react";

export function QuickFlipIcon({
  front,
  back,
}: {
  front: React.ReactNode;
  back: React.ReactNode;
}) {
  return (
    <span
      className="quick-flip-icon inline-block overflow-hidden align-middle mb-1"
      style={{ height: "1.4em" }}
    >
      <span className="quick-flip-inner flex flex-col">
        <span>{front}</span>
        <span>{back}</span>
      </span>
    </span>
  );
}
