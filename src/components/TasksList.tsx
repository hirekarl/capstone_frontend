import TaskCard from "./Cards/TaskCard/TaskCard"

import type { TaskType } from "../types"

export default function TasksList({ tasks }: { tasks: TaskType[] }) {
  const taskCards = tasks?.map((task) => (
    <TaskCard
      key={task._id}
      _id={task._id}
      title={task.title}
      description={task.description}
      status={task.status}
      project={task.project}
    />
  ))
  return taskCards
}
