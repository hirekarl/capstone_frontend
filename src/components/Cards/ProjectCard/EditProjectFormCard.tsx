import type { Dispatch, SetStateAction } from "react"

import type { ProjectType } from "../../../types"

import EditProjectForm from "../../../forms/EditProjectForm"

interface EditProjectFormCardProps {
  project: ProjectType
  setIsEditing: Dispatch<SetStateAction<boolean>>
  setProjects: Dispatch<SetStateAction<ProjectType[] | null>>
}

export default function EditProjectFormCard({
  project,
  setIsEditing,
  setProjects,
}: EditProjectFormCardProps) {
  return (
    <div className="card mb-3 p-3">
      <EditProjectForm
        project={project}
        setIsEditing={setIsEditing}
        setProjects={setProjects}
      />
    </div>
  )
}
