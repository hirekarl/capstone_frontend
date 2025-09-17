import type { MouseEvent } from "react"
import type { ProjectType, TaskType } from "../../types"

import CardBody from "./CardBody"
import CardFooter from "./CardFooter"

export interface BaseCardProps {
  data: ProjectType | TaskType
  handleDetailButtonClick: (event: MouseEvent) => void
  handleEditButtonClick: (event: MouseEvent) => void
  handleDeleteButtonClick: (event: MouseEvent) => void
}

export default function BaseCard({
  data,
  handleDetailButtonClick,
  handleEditButtonClick,
  handleDeleteButtonClick,
}: BaseCardProps) {
  const cardBody =
    // Render CardBody with children if Task
    "status" in data ? (
      <CardBody heading={data.title} text={data.description}>
        <p className="card-text">{data.status}</p>
      </CardBody>
    ) : (
      <CardBody heading={data.name} text={data.description} />
    )

  return (
    <div className="card mb-3">
      {cardBody}
      <CardFooter
        handleDetailButtonClick={handleDetailButtonClick}
        handleEditButtonClick={handleEditButtonClick}
        handleDeleteButtonClick={handleDeleteButtonClick}
      />
    </div>
  )
}
