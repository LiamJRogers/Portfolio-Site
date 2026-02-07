import React from "react";

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span
    className="text-base text-white font-semibold rounded px-3 py-2 mr-2 mb-2 backdrop-blur-lg"
    style={{ backgroundColor: "rgba(191,188,186,0.5)" }}
  >
    {children}
  </span>
);

export default Badge;
