import EditButton from "../CardButtons/EditButton"
import DeleteButton from "../CardButtons/DeleteButton"

interface TaskCardFooterProps {
  handleEditButtonClick: () => void
  handleDeleteButtonClick: () => void
}

export default function ProjectCardFooter({
  handleEditButtonClick,
  handleDeleteButtonClick,
}: TaskCardFooterProps) {
  return (
    <div className="card-footer">
      <div className="d-flex align-items-center justify-content-start gap-1">
        <EditButton handleClick={handleEditButtonClick} />
        <DeleteButton handleClick={handleDeleteButtonClick} />
      </div>
    </div>
  )
}
