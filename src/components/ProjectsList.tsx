import type { Dispatch, SetStateAction } from "react"

import type { ProjectType } from "../types"

import ProjectCard from "./Cards/ProjectCard/ProjectCard"

interface ProjectsListProps {
  projects: ProjectType[]
  setProjects: Dispatch<SetStateAction<ProjectType[] | null>>
}

export default function ProjectsList({
  projects,
  setProjects,
}: ProjectsListProps) {
  const sortedProjects = [...projects].sort((a, b) => {
    return a.name.localeCompare(b.name)
  })

  const projectCards = sortedProjects.map((project) => (
    <ProjectCard
      key={project._id}
      project={project}
      setProjects={setProjects}
    />
  ))
  return projectCards
}
