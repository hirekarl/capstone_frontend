import type { Dispatch, SetStateAction } from "react"

import type { TaskType, TaskStatusType } from "../types"

import TaskCard from "./Cards/TaskCard/TaskCard"

const TaskStatusSortRank: Record<TaskStatusType, number> = {
  "To Do": 1,
  "In Progress": 2,
  "Done": 3,
} as const

interface TasksListProps {
  tasks: TaskType[]
  setTasks: Dispatch<SetStateAction<TaskType[] | null>>
}

export default function TasksList({ tasks, setTasks }: TasksListProps) {
  const sortedTasks = [...tasks].sort((a, b) => {
    const rankA = TaskStatusSortRank[a.status]
    const rankB = TaskStatusSortRank[b.status]

    // Sort first by status, then by title
    if (rankA !== rankB) {
      return rankA - rankB
    }
    return a.title.localeCompare(b.title)
  })

  const taskCards = sortedTasks.map((task) => (
    <TaskCard key={task._id} task={task} setTasks={setTasks} />
  ))
  return taskCards
}
