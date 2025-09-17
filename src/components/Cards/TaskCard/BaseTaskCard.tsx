import type { Dispatch, SetStateAction } from "react"
import type { TaskType, TaskStatusType } from "../../../types"

import TaskCardBody from "./TaskCardBody"
import TaskCardFooter from "./TaskCardFooter"

interface BaseTaskCardProps {
  task: TaskType
  handleEditButtonClick: () => void
  handleDeleteButtonClick: () => void
  handleStatusChange: (newStatus: TaskStatusType) => void
  setNeedsReload: Dispatch<SetStateAction<boolean>>
}

export default function BaseTaskCard({
  task,
  handleEditButtonClick,
  handleDeleteButtonClick,
  handleStatusChange,
  setNeedsReload,
}: BaseTaskCardProps) {
  return (
    <div className="card mb-3">
      <TaskCardBody
        heading={task.title}
        text={task.description}
        status={task.status}
      />
      <TaskCardFooter
        task={task}
        handleEditButtonClick={handleEditButtonClick}
        handleDeleteButtonClick={handleDeleteButtonClick}
        handleStatusChange={handleStatusChange}
        setNeedsReload={setNeedsReload}
      />
    </div>
  )
}
