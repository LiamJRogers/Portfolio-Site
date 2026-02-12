import ProjectCard from "../../components/ProjectCard";
import { projects } from "../../data/projects";

const Projects = ({
  setCursorActive,
  setCardHover,
}: {
  setCursorActive: (active: boolean) => void;
  setCardHover: (hover: boolean) => void;
}) => (
  <section
    id="projects"
    className="py-16 bg-white px-4 md:px-8"
    onMouseEnter={() => setCursorActive(true)}
    onMouseLeave={() => {
      setCursorActive(false);
      setCardHover(false);
    }}
  >
    <h2
      className="text-6xl md:text-7xl font-bold mb-8 p-4 md:p-8 text-center"
      style={{ fontFamily: "'Nothing You Could Do', cursive" }}
    >
      Project Highlights
    </h2>
    <div className="flex flex-col w-full gap-y-8 md:hidden">
      {projects.map((project, idx) => (
        <div key={idx}>
          <ProjectCard
            project={project}
            showTitleBelow={true}
            onCardHover={setCardHover}
            size="full"
          />
        </div>
      ))}
    </div>
    <div className="hidden md:flex flex-col w-full gap-y-4">
      {projects.map((project, idx) =>
        idx % 2 === 0 ? (
          <div key={idx} className="flex flex-row w-full gap-x-4">
            {idx % 4 === 0 ? (
              <>
                <div className="flex-1">
                  <ProjectCard
                    project={project}
                    onCardHover={setCardHover}
                    size="large"
                  />
                </div>
                {projects[idx + 1] && (
                  <div className="shrink-0 grow-0 w-[40%]">
                    <ProjectCard
                      project={projects[idx + 1]}
                      onCardHover={setCardHover}
                      size="small"
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="shrink-0 grow-0 w-[40%]">
                  <ProjectCard
                    project={project}
                    onCardHover={setCardHover}
                    size="small"
                  />
                </div>
                {projects[idx + 1] && (
                  <div className="flex-1">
                    <ProjectCard
                      project={projects[idx + 1]}
                      onCardHover={setCardHover}
                      size="large"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        ) : null,
      )}
    </div>
  </section>
);

export default Projects;
