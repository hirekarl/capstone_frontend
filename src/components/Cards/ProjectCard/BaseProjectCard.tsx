import type { ProjectType } from "../../../types"

import CardBody from "./ProjectCardBody"
import CardFooter from "./ProjectCardFooter"

interface BaseProjectCardProps {
  project: ProjectType
  handleDetailButtonClick: () => void
  handleEditButtonClick: () => void
  handleDeleteButtonClick: () => void
}

export default function BaseProjectCard({
  project: data,
  handleDetailButtonClick,
  handleEditButtonClick,
  handleDeleteButtonClick,
}: BaseProjectCardProps) {
  return (
    <div className="card mb-3">
      <CardBody heading={data.name} text={data.description} />
      <CardFooter
        handleDetailButtonClick={handleDetailButtonClick}
        handleEditButtonClick={handleEditButtonClick}
        handleDeleteButtonClick={handleDeleteButtonClick}
      />
    </div>
  )
}
