import { useState, type ChangeEvent, type Dispatch, type SetStateAction } from "react"

import EditButton from "../CardButtons/EditButton"
import DeleteButton from "../CardButtons/DeleteButton"
import type { TaskStatusType, TaskType } from "../../../types"

interface TaskCardFooterProps {
  task: TaskType
  handleEditButtonClick: () => void
  handleDeleteButtonClick: () => void
  handleStatusChange: (newStatus: TaskStatusType) => void
  setNeedsReload: Dispatch<SetStateAction<boolean>>
}

export default function ProjectCardFooter({
  task,
  handleEditButtonClick,
  handleDeleteButtonClick,
  handleStatusChange,
  setNeedsReload
}: TaskCardFooterProps) {
  const [status, setStatus] = useState<TaskStatusType>(task.status)

  const handleChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value as TaskStatusType)
    await handleStatusChange(event.target.value as TaskStatusType)
    setNeedsReload((prevNeedsReload) => !prevNeedsReload)
  }
  return (
    <div className="card-footer">
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <select name="status" className="form-select" onChange={handleChange} value={status}>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div className="d-flex align-items-center justify-content-end gap-1">
          <EditButton handleClick={handleEditButtonClick} />
          <DeleteButton handleClick={handleDeleteButtonClick} />
        </div>
      </div>
    </div>
  )
}
