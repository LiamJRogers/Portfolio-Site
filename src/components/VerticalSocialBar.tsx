import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const VerticalSocialBar = () => (
  <div className="absolute bottom-8 left-10 flex flex-col items-center z-30">
    <div className="flex flex-col gap-4 mb-6">
      <a
        href="https://github.com/yourusername"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubIcon className="text-xl md:text-2xl text-gray-700 hover:text-teal-500 transition" />
      </a>
      <a
        href="https://linkedin.com/in/yourusername"
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkedInIcon className="text-xl md:text-2xl text-gray-700 hover:text-teal-500 transition" />
      </a>
    </div>
    <div className="flex flex-col items-center">
      <div className="w-1.5 h-1.5 rounded-full bg-black" />
      <div className="w-px h-24 md:h-40 bg-black" />
      <div className="w-1.5 h-1.5 rounded-full bg-black" />
    </div>
  </div>
);

export default VerticalSocialBar;
