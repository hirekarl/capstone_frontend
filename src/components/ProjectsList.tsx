import ProjectCard from "./Cards/ProjectCard/ProjectCard"

import type { ProjectType } from "../types"
import type { Dispatch, SetStateAction } from "react"

export interface ProjectsListProps {
  projects: ProjectType[]
  setProjects: Dispatch<SetStateAction<ProjectType[] | null>>
}

export default function ProjectsList({
  projects,
  setProjects,
}: ProjectsListProps) {
  const projectCards = projects?.map((project) => (
    <ProjectCard
      key={project._id}
      project={project}
      setProjects={setProjects}
    />
  ))
  return projectCards
}
