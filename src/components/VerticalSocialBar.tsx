import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { socials } from "../data/socials";
import Magnet from "./Magnet";

const iconMap: Record<string, React.ReactNode> = {
  GitHub: (
    <GitHubIcon
      sx={{ fontSize: 30 }}
      className="text-gray-700 hover:text-gray-600 transition"
    />
  ),
  LinkedIn: (
    <LinkedInIcon
      sx={{ fontSize: 30 }}
      className="text-gray-700 hover:text-gray-600 transition"
    />
  ),
};

const VerticalSocialBar = () => (
  <div className="absolute bottom-8 left-10 flex flex-col items-center z-30">
    <div className="flex flex-col gap-6 mb-6">
      {socials.map((social) => (
        <Magnet
          key={social.name}
          padding={30}
          disabled={false}
          magnetStrength={6}
        >
          <a href={social.url} target="_blank" rel="noopener noreferrer">
            {iconMap[social.icon]}
          </a>
        </Magnet>
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
