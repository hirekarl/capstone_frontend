import type { Dispatch, SetStateAction } from "react"

import type { TaskType } from "../../../types"

import EditTaskForm from "../../../forms/EditTaskForm"

interface EditTaskFormCardProps {
  task: TaskType
  setIsEditing: Dispatch<SetStateAction<boolean>>
  setTasks: Dispatch<SetStateAction<TaskType[] | null>>
}

export default function EditTaskFormCard({
  task,
  setIsEditing,
  setTasks,
}: EditTaskFormCardProps) {
  return (
    <div className="card mb-3 p-3">
      <EditTaskForm
        task={task}
        setIsEditing={setIsEditing}
        setTasks={setTasks}
      />
    </div>
  )
}
