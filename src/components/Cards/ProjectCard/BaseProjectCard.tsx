import type { ProjectType } from "../../../types"

import ProjectCardBody from "./ProjectCardBody"
import ProjectCardFooter from "./ProjectCardFooter"

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
      <ProjectCardBody heading={data.name} text={data.description} />
      <ProjectCardFooter
        handleDetailButtonClick={handleDetailButtonClick}
        handleEditButtonClick={handleEditButtonClick}
        handleDeleteButtonClick={handleDeleteButtonClick}
      />
    </div>
  )
}
