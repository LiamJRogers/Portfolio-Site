import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { socials } from "../data/socials";

const iconMap: Record<string, React.ReactNode> = {
  GitHub: (
    <GitHubIcon
      sx={{ fontSize: 30 }}
      className="text-gray-700 hover:text-teal-500 transition"
    />
  ),
  LinkedIn: (
    <LinkedInIcon
      sx={{ fontSize: 30 }}
      className="text-gray-700 hover:text-teal-500 transition"
    />
  ),
};

const VerticalSocialBar = () => (
  <div className="absolute bottom-8 left-10 flex flex-col items-center z-30">
    <div className="flex flex-col gap-6 mb-6">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {iconMap[social.icon]}
        </a>
      ))}
    </div>
    <div className="flex flex-col items-center">
      <div className="w-1.5 h-1.5 rounded-full bg-black" />
      <div className="w-px h-24 md:h-40 bg-black" />
      <div className="w-1.5 h-1.5 rounded-full bg-black" />
    </div>
  </div>
);

export default VerticalSocialBar;
