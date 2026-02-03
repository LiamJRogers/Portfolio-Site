import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import ArrowOutward from "@mui/icons-material/ArrowOutward";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [contactHovered, setContactHovered] = useState(false);

  const animateLinksIn = () => {
    linkRefs.current.forEach((link, i) => {
      if (link) {
        const letters = link.querySelectorAll("span");
        gsap.fromTo(
          letters,
          { y: -32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.32,
            delay: 0.04 + i * 0.04,
            stagger: 0.025,
            ease: "power2.out",
          },
        );
      }
    });
  };

  const animateLinksOut = () => {
    linkRefs.current.forEach((link, i) => {
      if (link) {
        const letters = link.querySelectorAll("span");
        gsap.to(letters, {
          y: -32,
          opacity: 0,
          duration: 0.18,
          delay: i * 0.02,
          stagger: 0.018,
          ease: "power2.in",
        });
      }
    });
  };

  const toggleNav = () => {
    setOpen((prev) => !prev);

    if (!open) {
      if (burgerRef.current?.children) {
        const [top, middle, bottom] = Array.from(
          burgerRef.current.children,
        ) as HTMLElement[];
        gsap.to(middle, {
          opacity: 0,
          duration: 0.16,
          ease: "power1.inOut",
          onComplete: () => {
            gsap.to(top, {
              rotate: 45,
              y: 8,
              duration: 0.18,
              ease: "power2.inOut",
            });
            gsap.to(bottom, {
              rotate: -45,
              y: -8,
              duration: 0.18,
              ease: "power2.inOut",
              onComplete: () => {
                gsap.to(navRef.current, {
                  y: 0,
                  duration: 0.5,
                  ease: "power4.out",
                  pointerEvents: "auto",
                  onComplete: animateLinksIn,
                });
              },
            });
          },
        });
      }
    } else {
      animateLinksOut();
      if (burgerRef.current?.children) {
        const [top, middle, bottom] = Array.from(
          burgerRef.current.children,
        ) as HTMLElement[];
        gsap.to(top, {
          rotate: 0,
          y: 0,
          duration: 0.18,
          ease: "power2.inOut",
        });
        gsap.to(bottom, {
          rotate: 0,
          y: 0,
          duration: 0.18,
          ease: "power2.inOut",
        });
        gsap.to(middle, {
          opacity: 1,
          duration: 0.16,
          ease: "power1.inOut",
          delay: 0.18,
          onComplete: () => {
            gsap.to(navRef.current, {
              y: "-100%",
              duration: 0.5,
              ease: "power4.in",
              pointerEvents: "none",
            });
          },
        });
      }
    }
  };

  React.useEffect(() => {
    gsap.set(navRef.current, { y: "-100%", pointerEvents: "none" });
    linkRefs.current.forEach((link) => {
      if (link) {
        const letters = link.querySelectorAll("span");
        gsap.set(letters, { y: -32, opacity: 0 });
      }
    });
  }, []);

  return (
    <header className="w-full flex items-center justify-between px-6 py-6 z-60 relative bg-white">
      <div className="font-bold text-xl">LJR</div>
      {/* Hamburger */}
      <button
        ref={burgerRef}
        className="flex flex-col justify-center w-8 h-8 gap-1.5 z-50 md:hidden"
        aria-label="Open navigation"
        onClick={toggleNav}
      >
        <span className="block h-0.5 w-6 bg-black rounded transition-all" />
        <span className="block h-0.5 w-6 bg-black rounded transition-all" />
        <span className="block h-0.5 w-6 bg-black rounded transition-all" />
      </button>
      {/* Desktop nav */}
      <nav className="hidden md:flex items-center h-10 px-22">
        {navLinks.map((link) =>
          link.label === "Contact" ? (
            <div key={link.href} className="flex">
              <a
                href={link.href}
                className={`quick-flip bg-black text-white rounded-full px-4 py-2 text-lg transition flex items-center ${contactHovered ? "quick-flip-hover" : ""}`}
                onMouseEnter={() => setContactHovered(true)}
                onMouseLeave={() => setContactHovered(false)}
              >
                <span>{link.label}</span>
              </a>
              <span
                className={`quick-flip flex items-center justify-center py-2 px-3 rounded-full bg-black text-white cursor-pointer shadow transition ${contactHovered ? "quick-flip-hover" : ""}`}
                onMouseEnter={() => setContactHovered(true)}
                onMouseLeave={() => setContactHovered(false)}
              >
                <span className="mb-1">
                  <ArrowOutward fontSize="small" />
                </span>
              </span>
            </div>
          ) : (
            <a
              key={link.href}
              href={link.href}
              className="quick-flip text-black text-lg flex items-center h-full mr-8 last:mr-0"
            >
              <span>{link.label}</span>
            </a>
          ),
        )}
      </nav>
      {/* Mobile nav overlay */}
      <div
        ref={navRef}
        className="fixed top-0 left-0 w-full h-screen bg-gray-100 flex flex-col items-center justify-center gap-12 md:hidden z-40"
        style={{ pointerEvents: "none" }}
      >
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            className="text-black text-3xl font-semibold"
            onClick={toggleNav}
            ref={(el) => {
              linkRefs.current[i] = el;
            }}
            style={{ display: "inline-block" }}
          >
            {link.label.split("").map((char, idx) => (
              <span key={idx} style={{ display: "inline-block" }}>
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </a>
        ))}
      </div>
    </header>
  );
};

export default NavBar;
