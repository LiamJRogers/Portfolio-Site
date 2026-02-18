import ProjectCard from "../../components/ProjectCard";
import { projects } from "../../data/projects";
import { motion } from "motion/react";

const Projects = ({
  setCursorActive,
  setCardHover,
}: {
  setCursorActive: (active: boolean) => void;
  setCardHover: (hover: boolean) => void;
}) => (
  <section
    id="projects"
    className="py-16 px-4 md:px-8 rounded-b-4xl"
    style={{ background: "#1E1E1E" }}
    onMouseEnter={() => setCursorActive(true)}
    onMouseLeave={() => {
      setCursorActive(false);
      setCardHover(false);
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
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.1 * idx }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <ProjectCard
            project={project}
            showTitleBelow={true}
            onCardHover={setCardHover}
            size="full"
          />
        </motion.div>
      ))}
    </div>
    <div className="hidden md:flex flex-col w-full gap-y-4">
      {projects.map((project, idx) =>
        idx % 2 === 0 ? (
          <div key={idx} className="flex flex-row w-full gap-x-4">
            {idx % 4 === 0 ? (
              <>
                <motion.div
                  className="flex-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.1 * idx }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <ProjectCard
                    project={project}
                    onCardHover={setCardHover}
                    size="large"
                  />
                </motion.div>
                {projects[idx + 1] && (
                  <motion.div
                    className="shrink-0 grow-0 w-[40%]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.1 * (idx + 1) }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <ProjectCard
                      project={projects[idx + 1]}
                      onCardHover={setCardHover}
                      size="small"
                    />
                  </motion.div>
                )}
              </>
            ) : (
              <>
                <motion.div
                  className="shrink-0 grow-0 w-[40%]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.1 * idx }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <ProjectCard
                    project={project}
                    onCardHover={setCardHover}
                    size="small"
                  />
                </motion.div>
                {projects[idx + 1] && (
                  <motion.div
                    className="flex-1"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.1 * (idx + 1) }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <ProjectCard
                      project={projects[idx + 1]}
                      onCardHover={setCardHover}
                      size="large"
                    />
                  </motion.div>
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
