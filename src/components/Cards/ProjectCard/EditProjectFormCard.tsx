import type { Dispatch, SetStateAction } from "react"

import type { ProjectType } from "../../../types"

import EditProjectForm from "../../../forms/EditProjectForm"

interface EditProjectFormCardProps {
  project: ProjectType
  setIsEditing: Dispatch<SetStateAction<boolean>>
  setNeedsReload: Dispatch<SetStateAction<boolean>>
}

export default function EditProjectFormCard({
  project,
  setIsEditing,
  setNeedsReload,
}: EditProjectFormCardProps) {
  return (
    <div className="card mb-3 p-3">
      <EditProjectForm
        project={project}
        setIsEditing={setIsEditing}
        setNeedsReload={setNeedsReload}
      />
    </div>
  )
}
