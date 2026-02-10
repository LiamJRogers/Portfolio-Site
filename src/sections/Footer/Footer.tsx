import VinylPlayer from "../../components/VinylPlayer";
import ArrowOutward from "@mui/icons-material/ArrowOutward";
import React from "react";
import { socials } from "../../data/socials";

const Footer = ({
  setCursorActive,
  setInvert,
}: {
  setCursorActive: (active: boolean) => void;
  setInvert: (invert: boolean) => void;
}) => {
  const [emailHovered, setEmailHovered] = React.useState(false);

  return (
    <div className="min-h-screen w-full bg-white flex items-center">
      <section
        id="footer"
        className="relative w-full h-full border-28 border-gray-200 flex flex-col md:flex-row items-center"
        onMouseEnter={() => setCursorActive(true)}
        onMouseLeave={() => setCursorActive(false)}
        style={{ minHeight: "100vh" }}
      >
        <div className="flex-2 flex flex-col items-start px-6 md:pl-32 md:pr-0 mb-12 md:mb-0 w-full pt-12 md:pt-0">
          <h2 className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-6">
            Get in touch{" "}
          </h2>
          <p className="text-lg text-gray-600 mb-8 pl-1">
            Feel free to reach out — I’m always happy to chat about code,
            projects, or ideas.
          </p>
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-16 w-full pl-6">
            <ul className="space-y-2">
              {socials.map((social) => (
                <li key={social.name} className="flex items-center">
                  <span className="mr-2 text-lg text-gray-600">—</span>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="quick-flip text-gray-600 text-lg flex items-center h-full transition hover:text-gray-700"
                  >
                    <span>{social.name}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex">
              <a
                href="mailto:liam@example.com"
                className={`quick-flip bg-black text-white rounded-full px-4 py-2 text-lg transition flex items-center ${emailHovered ? "quick-flip-hover" : ""}`}
                onMouseEnter={() => setEmailHovered(true)}
                onMouseLeave={() => setEmailHovered(false)}
              >
                <span>Drop me an email</span>
              </a>
              <span
                className={`quick-flip flex items-center justify-center py-2 px-3 rounded-full bg-black text-white cursor-pointer shadow transition ${emailHovered ? "quick-flip-hover" : ""}`}
                onMouseEnter={() => setEmailHovered(true)}
                onMouseLeave={() => setEmailHovered(false)}
              >
                <span className="mb-1">
                  <ArrowOutward fontSize="small" />
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex-3 flex flex-col items-center justify-center px-6 md:pr-12 w-full">
          <span className="mb-6 text-xl font-semibold text-gray-800">
            Currently on repeat:
          </span>
          <VinylPlayer setInvert={setInvert} />
        </div>
        <div className="w-full mt-8 pb-6 md:pb-0 text-center text-xs text-gray-500 md:absolute md:left-4 md:bottom-4 md:w-auto md:mt-0 md:text-left">
          © {new Date().getFullYear()} Liam Jack Rogers.
          <br className="md:hidden" /> All rights reserved.
        </div>
      </section>
    </div>
  );
};

export default Footer;
