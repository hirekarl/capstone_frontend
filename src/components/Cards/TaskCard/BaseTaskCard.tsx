import type { TaskType } from "../../../types"

import TaskCardBody from "./TaskCardBody"
import TaskCardFooter from "./TaskCardFooter"

interface BaseTaskCardProps {
  task: TaskType
  handleEditButtonClick: () => void
  handleDeleteButtonClick: () => void
}

export default function BaseTaskCard({
  task,
  handleEditButtonClick,
  handleDeleteButtonClick,
}: BaseTaskCardProps) {
  return (
    <div className="card mb-3">
      <TaskCardBody
        heading={task.title}
        text={task.description}
        status={task.status}
      />
      <TaskCardFooter
        handleEditButtonClick={handleEditButtonClick}
        handleDeleteButtonClick={handleDeleteButtonClick}
      />
    </div>
  )
}
