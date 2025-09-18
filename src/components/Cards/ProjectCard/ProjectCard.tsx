import { useState, type Dispatch, type SetStateAction } from "react"
import { useNavigate } from "react-router-dom"

import { type ProjectType } from "../../../types"

import { useLocalStorage } from "../../../hooks/useLocalStorage"

import { deleteProject } from "../../../api/apiController"

import BaseProjectCard from "./BaseProjectCard"
import EditProjectFormCard from "./EditProjectFormCard"

interface ProjectCardProps {
  project: ProjectType
  setProjects: Dispatch<SetStateAction<ProjectType[] | null>>
}

export default function ProjectCard({
  project,
  setProjects,
}: ProjectCardProps) {
  const projectId = project._id
  const navigate = useNavigate()

  const [isEditing, setIsEditing] = useState<boolean>(false)

  const [userData] = useLocalStorage()
  const token = userData?.token

  const handleDetailButtonClick = () => {
    navigate(`${projectId}`)
  }
  const handleEditButtonClick = () => {
    setIsEditing(true)
  }
  const handleDeleteButtonClick = async () => {
    if (token) {
      try {
        const deletedProject = await deleteProject(token, projectId)
        setProjects((prevProjects) =>
          prevProjects
            ? prevProjects.filter(
                (project) => project._id !== deletedProject._id
              )
            : null
        )
      } catch (error) {
        console.error(error)
      }
    }
  }

  const content = isEditing ? (
    <EditProjectFormCard
      project={project}
      setIsEditing={setIsEditing}
      setProjects={setProjects}
    />
  ) : (
    <BaseProjectCard
      project={project}
      handleDetailButtonClick={handleDetailButtonClick}
      handleEditButtonClick={handleEditButtonClick}
      handleDeleteButtonClick={handleDeleteButtonClick}
    />
  )

  return content
}
