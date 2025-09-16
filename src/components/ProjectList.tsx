import ProjectCard from "./ProjectCard"

import type { ProjectType } from "../types"

export default function ProjectList({ projects }: { projects: ProjectType[] }) {
  const projectCards = projects?.map((project) => (
    <ProjectCard
      key={project._id}
      _id={project._id}
      name={project.name}
      description={project.description}
      owner={project.owner}
    />
  ))
  return projectCards
}
