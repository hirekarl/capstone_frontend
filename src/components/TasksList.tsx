import TaskCard from "./Cards/TaskCard/TaskCard"

import type { TaskType } from "../types"
import type { Dispatch, SetStateAction } from "react"

export interface TasksListProps {
  tasks: TaskType[]
  setNeedsReload: Dispatch<SetStateAction<boolean>>
}

export default function TasksList({ tasks, setNeedsReload }: TasksListProps) {
  const taskCards = tasks?.map((task) => (
    <TaskCard key={task._id} task={task} setNeedsReload={setNeedsReload} />
  ))
  return taskCards
}
