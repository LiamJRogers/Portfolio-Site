import React from "react";
import ArrowOutward from "@mui/icons-material/ArrowOutward";
import StaggeredMenu from "./StaggeredMenu";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const menuItems = [
  { label: "Home", ariaLabel: "Go to home page", link: "#" },
  { label: "About", ariaLabel: "Learn about me", link: "#about" },
  { label: "Projects", ariaLabel: "View my projects", link: "#projects" },
  { label: "Contact", ariaLabel: "Get in touch", link: "#contact" },
];

const socialItems = [
  { label: "GitHub", link: "https://github.com/yourusername" },
  { label: "LinkedIn", link: "https://linkedin.com/in/yourusername" },
];

const NavBar = () => {
  const [contactHovered, setContactHovered] = React.useState(false);

  return (
    <header className="w-full flex items-center justify-between px-6 py-6 z-60 relative bg-white">
      <div
        className="font-bold text-3xl ml-2"
        style={{ fontFamily: "'Koulen', sans-serif" }}
      >
        LJR
      </div>
      {/* Desktop nav */}
      <nav className="hidden md:flex items-center h-10 px-22">
        {navLinks.map((link) =>
          link.label === "Contact" ? (
            <div key={link.href} className="flex">
              <a
                href={link.href}
                className={`quick-flip bg-black text-white rounded-full px-4 py-2 text-2xl transition flex items-center font-sans ${contactHovered ? "quick-flip-hover" : ""}`}
                onMouseEnter={() => setContactHovered(true)}
                onMouseLeave={() => setContactHovered(false)}
                style={{ fontFamily: "'Koulen', sans-serif" }}
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
              className="quick-flip text-black text-2xl flex items-center h-full mr-8 last:mr-0 font-sans"
              style={{ fontFamily: "'Koulen', sans-serif" }}
            >
              <span>{link.label}</span>
            </a>
          ),
        )}
      </nav>
      {/* Mobile nav: StaggeredMenu */}
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
          colors={["#B19EEF", "#5227FF"]}
          accentColor="#ff2929"
          onMenuOpen={() => console.log("Menu opened")}
          onMenuClose={() => console.log("Menu closed")}
        />
      </div>
    </header>
  );
};

export default NavBar;
