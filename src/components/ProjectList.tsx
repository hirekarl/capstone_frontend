import ProjectCard from "./Cards/ProjectCard/ProjectCard"

import type { ProjectType } from "../types"
import type { Dispatch, SetStateAction } from "react"

export interface ProjectListProps {
  projects: ProjectType[]
  setNeedsReload: Dispatch<SetStateAction<boolean>>
}

export default function ProjectList({
  projects,
  setNeedsReload,
}: ProjectListProps) {
  const projectCards = projects?.map((project) => (
    <ProjectCard
      key={project._id}
      project={project}
      setNeedsReload={setNeedsReload}
    />
  ))
  return projectCards
}
