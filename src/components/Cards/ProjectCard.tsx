import { useState, type Dispatch, type SetStateAction } from "react"
import { useNavigate } from "react-router-dom"

import { type ProjectType } from "../../types"

import { useLocalStorage } from "../../hooks/useLocalStorage"

import { deleteProject } from "../../api/apiController"

import BaseCard from "./BaseCard"
import EditProjectFormCard from "./EditProjectFormCard"

export interface ProjectCardProps {
  data: ProjectType
  setNeedsReload: Dispatch<SetStateAction<boolean>>
}

export default function ProjectCard({
  data,
  setNeedsReload,
}: ProjectCardProps) {
  const projectId = data._id
  const navigate = useNavigate()

  const [isEditing, setIsEditing] = useState<boolean>(false)

  const [userData, _setUserData] = useLocalStorage()
  const token = userData?.token

  const handleDetailButtonClick = () => {
    navigate(`projects/${projectId}`)
  }
  const handleEditButtonClick = () => {
    setIsEditing(true)
  }
  const handleDeleteButtonClick = async () => {
    if (token) {
      await deleteProject(token, projectId)
      setNeedsReload((prevNeedsReload) => !prevNeedsReload)
    }
  }

  const content = isEditing ? (
    <div className="card mb-3">
      <EditProjectFormCard
        project={data}
        setIsEditing={setIsEditing}
        setNeedsReload={setNeedsReload}
      />
    </div>
  ) : (
    <BaseCard
      data={data}
      handleDetailButtonClick={handleDetailButtonClick}
      handleEditButtonClick={handleEditButtonClick}
      handleDeleteButtonClick={handleDeleteButtonClick}
    />
  )

  return content
}
