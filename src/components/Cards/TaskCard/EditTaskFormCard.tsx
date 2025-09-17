import type { Dispatch, SetStateAction } from "react"

import type { TaskType } from "../../../types"

import EditTaskForm from "../../../forms/EditTaskForm"

interface EditTaskFormCardProps {
  task: TaskType
  setIsEditing: Dispatch<SetStateAction<boolean>>
  setNeedsReload: Dispatch<SetStateAction<boolean>>
}

export default function EditTaskFormCard({
  task,
  setIsEditing,
  setNeedsReload,
}: EditTaskFormCardProps) {
  return (
    <div className="card mb-3 p-3">
      <EditTaskForm
        task={task}
        setIsEditing={setIsEditing}
        setNeedsReload={setNeedsReload}
      />
    </div>
  )
}
