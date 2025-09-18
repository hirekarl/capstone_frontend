import type { Dispatch, SetStateAction } from "react"

import type { TaskType } from "../types"

import TaskCard from "./Cards/TaskCard/TaskCard"

export interface TasksListProps {
  tasks: TaskType[]
  setTasks: Dispatch<SetStateAction<TaskType[] | null>>
}

export default function TasksList({ tasks, setTasks }: TasksListProps) {
  const taskCards = tasks?.map((task) => (
    <TaskCard key={task._id} task={task} setTasks={setTasks} />
  ))
  return taskCards
}
