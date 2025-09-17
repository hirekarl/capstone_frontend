import { useState, type Dispatch, type SetStateAction } from "react"

import { type TaskType } from "../../../types"

import { useLocalStorage } from "../../../hooks/useLocalStorage"

import { deleteTask } from "../../../api/apiController"

import BaseTaskCard from "./BaseTaskCard"
import EditTaskFormCard from "./EditTaskFormCard"

interface TaskCardProps {
  task: TaskType
  setNeedsReload: Dispatch<SetStateAction<boolean>>
}

export default function TaskCard({ task, setNeedsReload }: TaskCardProps) {
  const taskId = task._id
  const projectId = task.project

  const [isEditing, setIsEditing] = useState<boolean>(false)

  const [userData] = useLocalStorage()
  const token = userData?.token

  const handleEditButtonClick = () => {
    setIsEditing(true)
  }
  const handleDeleteButtonClick = async () => {
    if (token) {
      await deleteTask(token, projectId, taskId)
      setNeedsReload((prevNeedsReload) => !prevNeedsReload)
    }
  }

  const content = isEditing ? (
    <div className="card mb-3">
      <EditTaskFormCard
        task={task}
        setIsEditing={setIsEditing}
        setNeedsReload={setNeedsReload}
      />
    </div>
  ) : (
    <BaseTaskCard
      task={task}
      handleEditButtonClick={handleEditButtonClick}
      handleDeleteButtonClick={handleDeleteButtonClick}
    />
  )

  return content
}
