import { useState, type Dispatch, type SetStateAction } from "react"

import { type TaskStatusType, type TaskType } from "../../../types"

import { useLocalStorage } from "../../../hooks/useLocalStorage"

import { editTask, deleteTask } from "../../../api/apiController"

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
      try {
        await deleteTask(token, projectId, taskId)
        setNeedsReload((prevNeedsReload) => !prevNeedsReload)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleStatusChange = async (newStatus: TaskStatusType) => {
    if (token) {
      try {
        await editTask(token, projectId, taskId, { status: newStatus })
      } catch (error) {
        console.error(error)
      }
    }
  }

  const content = isEditing ? (
    <EditTaskFormCard
      task={task}
      setIsEditing={setIsEditing}
      setNeedsReload={setNeedsReload}
    />
  ) : (
    <BaseTaskCard
      task={task}
      handleEditButtonClick={handleEditButtonClick}
      handleDeleteButtonClick={handleDeleteButtonClick}
      handleStatusChange={handleStatusChange}
      setNeedsReload={setNeedsReload}
    />
  )

  return content
}
