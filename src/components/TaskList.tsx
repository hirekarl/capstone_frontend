import TaskCard from "./TaskCard"

import type { TaskType } from "../types"

export default function ProjectList({ tasks }: { tasks: TaskType[] }) {
  const projectCards = tasks?.map((task) => (
    <TaskCard
      key={task._id}
      _id={task._id}
      title={task.title}
      description={task.description}
      status={task.status}
      project={task.project}
    />
  ))
  return projectCards
}
