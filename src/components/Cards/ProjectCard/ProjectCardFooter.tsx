import DetailButton from "../CardButtons/DetailButton"
import EditButton from "../CardButtons/EditButton"
import DeleteButton from "../CardButtons/DeleteButton"

interface ProjectCardFooterProps {
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
      <div className="d-flex align-items-center justify-content-between">
        <DetailButton handleClick={handleDetailButtonClick} />
        <div className="d-flex align-items-center justify-content-end gap-1">
          <EditButton handleClick={handleEditButtonClick} />
          <DeleteButton handleClick={handleDeleteButtonClick} />
        </div>
      </div>
    </div>
  )
}
