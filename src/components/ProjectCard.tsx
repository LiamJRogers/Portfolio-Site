import Badge from "./Badge";

interface ProjectCardProps {
  project: {
    title: string;
    image: string;
    link: string;
    technologies: string[];
  };
  showTitleBelow?: boolean;
  onCardHover?: (hover: boolean) => void;
  size?: "large" | "small" | "full";
}

const ProjectCard = ({
  project,
  showTitleBelow = false,
  onCardHover,
  size = "full",
}: ProjectCardProps) => {
  const heightClass =
    size === "large"
      ? "h-[520px]"
      : size === "small"
        ? "h-[520px]"
        : "h-[320px] md:h-[440px]";

  return (
    <>
      <div
        className={`group relative overflow-hidden rounded-3xl shadow w-full ${heightClass}`}
        style={{
          backgroundImage: `url(${project.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onMouseEnter={() => onCardHover && onCardHover(true)}
        onMouseLeave={() => onCardHover && onCardHover(false)}
      >
        <div className="absolute top-0 left-0 m-8 flex flex-wrap z-20 hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.technologies.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
        {!showTitleBelow && (
          <span
            className="
              absolute left-0 bottom-0 m-8
              text-2xl md:text-4xl font-bold text-white drop-shadow-lg
              z-20
              opacity-0 group-hover:opacity-100 transition-opacity duration-300
              hidden md:inline
            "
            style={{ fontFamily: "'Nothing You Could Do', cursive" }}
          >
            {project.title}
          </span>
        )}
        <div
          className="
            absolute inset-0
            bg-transparent
            md:bg-black/40
            md:backdrop-blur
            opacity-100
            md:opacity-0 md:group-hover:opacity-100
            transition-opacity duration-300
            w-full h-full
            pointer-events-none
            z-10
          "
        />
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 w-full h-full z-20"
          tabIndex={-1}
          aria-label={`View ${project.title} on GitHub`}
        />
      </div>
      <div
        className="mt-4 ml-2 text-4xl font-bold text-gray-900 md:hidden"
        style={{ fontFamily: "'Koulen', sans-serif" }}
      >
        {project.title}
      </div>
    </>
  );
};

export default ProjectCard;
