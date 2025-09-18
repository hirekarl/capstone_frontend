import type { Dispatch, SetStateAction } from "react"

import type { ProjectType } from "../types"

import ProjectCard from "./Cards/ProjectCard/ProjectCard"

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
