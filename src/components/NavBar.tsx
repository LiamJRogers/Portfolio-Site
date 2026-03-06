import React from "react";
import ArrowOutward from "@mui/icons-material/ArrowOutward";
import StaggeredMenu from "./StaggeredMenu";
import { socials } from "../data/socials";

const NAV_LINKS = [
  { label: "Home", href: "#", ariaLabel: "Go to home page" },
  { label: "About", href: "#about", ariaLabel: "Learn about me" },
  {
    label: "Toolbox",
    href: "#technologies",
    ariaLabel: "See my technologies",
  },
  { label: "Projects", href: "#projects", ariaLabel: "View my projects" },
  { label: "Contact", href: "#contact", ariaLabel: "Get in touch" },
];

const socialItems = socials.map((s) => ({
  label: s.name,
  link: s.url,
}));

const NavBar = ({
  onMenuOpen,
  onMenuClose,
}: {
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}) => {
  const [contactHovered, setContactHovered] = React.useState(false);

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const selector = `#${id}`;

    const smoother =
      (window as any)._smoother ||
      ((window as any).ScrollSmoother &&
        typeof (window as any).ScrollSmoother.get === "function" &&
        (window as any).ScrollSmoother.get()) ||
      null;

    if (smoother) {
      try {
        smoother.scrollTo(selector, true, "top");
        setTimeout(() => (window as any).ScrollTrigger?.update?.(), 50);
      } catch {
        const section = document.getElementById(id);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const desktopNavLinks = NAV_LINKS.filter((link) => link.label !== "Home");

  const menuItems = NAV_LINKS.map((link) => ({
    label: link.label,
    ariaLabel: link.ariaLabel,
    link: link.href,
  }));

  return (
    <header className="w-full flex items-center justify-between px-6 py-6 z-60 relative bg-white">
      <div
        className="font-bold text-3xl ml-2"
        style={{ fontFamily: "'Koulen', sans-serif" }}
      >
        LJR
      </div>
      <nav className="hidden md:flex items-center h-10 px-22">
        {desktopNavLinks.map((link) =>
          link.label === "Contact" ? (
            <div key={link.href} className="flex">
              <a
                href={link.href}
                onClick={handleNavClick(link.href)}
                className={`quick-flip bg-black text-white rounded-full px-4 py-2 text-2xl transition flex items-center font-sans ${contactHovered ? "quick-flip-hover" : ""}`}
                onMouseEnter={() => setContactHovered(true)}
                onMouseLeave={() => setContactHovered(false)}
                style={{ fontFamily: "'Koulen', sans-serif" }}
                aria-label={link.ariaLabel}
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
              onClick={handleNavClick(link.href)}
              className="quick-flip text-black text-2xl flex items-center h-full mr-8 last:mr-0 font-sans"
              style={{ fontFamily: "'Koulen', sans-serif" }}
              aria-label={link.ariaLabel}
            >
              <span>{link.label}</span>
            </a>
          ),
        )}
      </nav>
      <div className="md:hidden">
        <StaggeredMenu
          isFixed
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials
          displayItemNumbering={true}
          menuButtonColor="#000"
          openMenuButtonColor="#000"
          changeMenuColorOnOpen={true}
          colors={["#1E1E1E", "#4A5565"]}
          accentColor="#4A5565"
          onMenuOpen={onMenuOpen}
          onMenuClose={onMenuClose}
        />
      </div>
    </header>
  );
};

export default NavBar;
