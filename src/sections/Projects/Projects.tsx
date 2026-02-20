import ProjectCard from "../../components/ProjectCard";
import { projects } from "../../data/projects";
import { motion } from "motion/react";

const Projects = ({
  setCursorActive,
  setCardHover,
  setInvert,
}: {
  setCursorActive: (active: boolean) => void;
  setCardHover: (hover: boolean) => void;
  setInvert: (invert: boolean) => void;
}) => (
  <section
    id="projects"
    className="py-16 px-4 md:px-8 rounded-b-4xl"
    style={{ background: "#1E1E1E" }}
    onMouseEnter={() => {
      setCursorActive(true);
      setInvert(true);
    }}
    onMouseLeave={() => {
      setCursorActive(false);
      setCardHover(false);
      setInvert(false);
    }}
  >
    <motion.h2
      className="text-6xl md:text-7xl font-bold mb-8 p-4 md:p-8 text-center text-white "
      style={{ fontFamily: "'Nothing You Could Do', cursive" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      Project Highlights
    </motion.h2>
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
