import { useState, type Dispatch, type SetStateAction } from "react"

import { type TaskStatusType, type TaskType } from "../../../types"

import { useLocalStorage } from "../../../hooks/useLocalStorage"

import { editTask, deleteTask } from "../../../api/apiController"

import BaseTaskCard from "./BaseTaskCard"
import EditTaskFormCard from "./EditTaskFormCard"

interface TaskCardProps {
  task: TaskType
  setTasks: Dispatch<SetStateAction<TaskType[] | null>>
}

export default function TaskCard({ task, setTasks }: TaskCardProps) {
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
        const deletedTask = await deleteTask(token, projectId, taskId)
        setTasks((prevTasks) =>
          prevTasks
            ? prevTasks.filter((task) => task._id !== deletedTask._id)
            : null
        )
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleStatusChange = async (newStatus: TaskStatusType) => {
    if (token) {
      try {
        const editedTask = await editTask(token, projectId, taskId, {
          status: newStatus,
        })
        setTasks((prevTasks) =>
          prevTasks
            ? prevTasks.map((task) =>
                task._id === editedTask._id ? editedTask : task
              )
            : [editedTask]
        )
      } catch (error) {
        console.error(error)
        return null
      }
    }
    return null
  }

  const content = isEditing ? (
    <EditTaskFormCard
      task={task}
      setIsEditing={setIsEditing}
      setTasks={setTasks}
    />
  ) : (
    <BaseTaskCard
      task={task}
      handleEditButtonClick={handleEditButtonClick}
      handleDeleteButtonClick={handleDeleteButtonClick}
      handleStatusChange={handleStatusChange}
      setTasks={setTasks}
    />
  )

  return content
}
