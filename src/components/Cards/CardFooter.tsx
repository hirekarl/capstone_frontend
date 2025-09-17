import type { MouseEvent } from "react"

import DetailButton from "./CardButtons/DetailButton"
import EditButton from "./CardButtons/EditButton"
import DeleteButton from "./CardButtons/DeleteButton"

export interface CardFooterProps {
  handleDetailButtonClick: (event: MouseEvent) => void
  handleEditButtonClick: (event: MouseEvent) => void
  handleDeleteButtonClick: (event: MouseEvent) => void
}

export default function CardFooter({
  handleDetailButtonClick,
  handleEditButtonClick,
  handleDeleteButtonClick,
}: CardFooterProps) {
  return (
    <div className="card-footer">
      <div className="d-flex align-items-center justify-content-start gap-1">
        <DetailButton handleClick={handleDetailButtonClick} />
        <EditButton handleClick={handleEditButtonClick} />
        <DeleteButton handleClick={handleDeleteButtonClick} />
      </div>
    </div>
  )
}
