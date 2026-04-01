import React from "react";

const CookieConsentBanner = ({
  onAccept,
  onDecline,
}: {
  onAccept: () => void;
  onDecline: () => void;
}) => (
  <div
    className="fixed bottom-0 left-0 w-screen bg-white text-[#1E1E1E] px-4 py-6 z-[10000] flex flex-col items-center justify-center shadow-[0_-2px_16px_rgba(0,0,0,0.06)]"
    style={{ fontFamily: "'Hind Vadodara', sans-serif" }}
  >
    <span
      className="mb-4 text-center max-w-[800px] w-full text-base"
      style={{ fontFamily: "'Hind Vadodara', sans-serif" }}
    >
      This website uses cookies and similar technologies from third-party
      services to provide features such as audio previews and analytics. You can
      accept or decline non-essential cookies. Some features may not work
      without them.
    </span>
    <div className="flex gap-4">
      <button
        className="bg-[#1E1E1E] text-white border-none rounded-md px-6 py-2 font-bold cursor-pointer text-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:bg-[#333]"
        style={{ fontFamily: "'Koulen', sans-serif" }}
        onClick={onAccept}
        aria-label="Accept cookies"
      >
        Accept
      </button>
      <button
        className="bg-white text-[#1E1E1E] border-2 border-[#1E1E1E] rounded-md px-6 py-2 font-bold cursor-pointer text-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:bg-[#f3f3f3]"
        style={{ fontFamily: "'Koulen', sans-serif" }}
        onClick={onDecline}
        aria-label="Decline cookies"
      >
        Decline
      </button>
    </div>
  </div>
);

export default CookieConsentBanner;
