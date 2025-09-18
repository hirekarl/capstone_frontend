import type { ReactNode } from "react"

import type { TaskStatusType } from "../../../types"

interface TaskCardBodyProps {
  heading: string
  text: string
  status: TaskStatusType
}

export default function ProjectCardBody({
  heading,
  text,
  status,
}: TaskCardBodyProps) {
  let statusBadge: ReactNode

  switch (true) {
    case status === "To Do":
      statusBadge = <span className="badge text-bg-danger">To Do</span>
      break
    case status === "In Progress":
      statusBadge = <span className="badge text-bg-warning">In Progress</span>
      break
    case status === "Done":
      statusBadge = <span className="badge text-bg-success">Done</span>
      break
    default:
      statusBadge = null
      break
  }
  return (
    <div className="card-body">
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h3 className="card-title fs-5">{heading}</h3>
        </div>
        {statusBadge && <div>{statusBadge}</div>}
      </div>
      <p className="card-text">{text}</p>
    </div>
  )
}
