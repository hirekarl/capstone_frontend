import { useState, type Dispatch, type SetStateAction } from "react"

import { useLocalStorage } from "../../../hooks/useLocalStorage"

import type { TaskStatusType, TaskType } from "../../../types"

import BaseTaskCard from "./BaseTaskCard"
import EditTaskFormCard from "./EditTaskFormCard"

import { editTask, deleteTask } from "../../../api/apiController"

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
        if (deletedTask) {
          setTasks((prevTasks) =>
            prevTasks
              ? prevTasks.filter((task) => task._id !== deletedTask._id)
              : null
          )
        } else {
          throw new Error("Couldn't delete task.")
        }
      } catch (error) {
        console.error(String(error))
      }
    }
  }

  const handleStatusChange = async (newStatus: TaskStatusType) => {
    if (token) {
      try {
        const editedTask = await editTask(token, projectId, taskId, {
          status: newStatus,
        })
        if (editedTask) {
          setTasks((prevTasks) =>
            prevTasks
              ? prevTasks.map((task) =>
                  task._id === editedTask._id ? editedTask : task
                )
              : [editedTask]
          )
        } else {
          throw new Error("Couldn't edit task.")
        }
      } catch (error) {
        console.error(String(error))
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
