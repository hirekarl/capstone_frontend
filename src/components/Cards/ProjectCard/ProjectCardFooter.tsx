import DetailButton from "../CardButtons/DetailButton"
import EditButton from "../CardButtons/EditButton"
import DeleteButton from "../CardButtons/DeleteButton"

export interface ProjectCardFooterProps {
  handleDetailButtonClick: () => void
  handleEditButtonClick: () => void
  handleDeleteButtonClick: () => void
}

export default function ProjectCardFooter({
  handleDetailButtonClick,
  handleEditButtonClick,
  handleDeleteButtonClick,
}: ProjectCardFooterProps) {
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
