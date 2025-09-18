import {
  useState,
  useEffect,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  type FormEvent,
} from "react"

import type { ProjectType, ProjectFormDataType } from "../types"

import { useLocalStorage } from "../hooks/useLocalStorage"

import { editProject } from "../api/apiController"

interface EditProjectFormProps {
  project: ProjectType
  setIsEditing: Dispatch<SetStateAction<boolean>>
  setProjects: Dispatch<SetStateAction<ProjectType[] | null>>
}

export default function EditProjectForm({
  project,
  setIsEditing,
  setProjects,
}: EditProjectFormProps) {
  const projectId = project._id

  const [userData] = useLocalStorage()
  const token = userData?.token

  const [projectFormData, setProjectFormData] = useState<ProjectFormDataType>({
    name: project.name,
    description: project.description,
  })

  const [isDirty, setIsDirty] = useState<boolean>(false)

  const [nameIsValid, setNameIsValid] = useState<boolean>(false)
  const [descriptionIsValid, setDescriptionIsValid] = useState<boolean>(false)

  useEffect(() => {
    setNameIsValid(projectFormData.name !== "")
    setDescriptionIsValid(projectFormData.description !== "")
  }, [projectFormData])

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!isDirty) {
      setIsDirty(true)
    }

    setProjectFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (nameIsValid && descriptionIsValid && token) {
      try {
        const editedProject = await editProject(
          token,
          projectId,
          projectFormData
        )
        setIsEditing(false)
        setProjects((prevProjects) =>
          prevProjects
            ? prevProjects.map((project) =>
                project._id === editedProject._id ? editedProject : project
              )
            : [editedProject]
        )
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name-input" className="form-label">
          Name
        </label>
        <input
          id="name-input"
          name="name"
          type="text"
          aria-describedby={!nameIsValid && isDirty ? "name-help" : undefined}
          autoComplete="off"
          onChange={handleChange}
          value={projectFormData.name}
          className={
            isDirty
              ? !nameIsValid
                ? "form-control is-invalid"
                : "form-control is-valid"
              : "form-control"
          }
        />
        {!nameIsValid && isDirty && (
          <div id="name-help" className="text-danger form-text">
            Please enter a project name.
          </div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="description-textarea" className="form-label">
          Description
        </label>
        <textarea
          id="description-textarea"
          name="description"
          aria-describedby={
            !descriptionIsValid && isDirty ? "description-help" : undefined
          }
          autoComplete="off"
          onChange={handleChange}
          value={projectFormData.description}
          className={
            isDirty
              ? !descriptionIsValid
                ? "form-control is-invalid"
                : "form-control is-valid"
              : "form-control"
          }
        />
        {!descriptionIsValid && isDirty && (
          <div id="description-help" className="text-danger form-text">
            Please enter a description.
          </div>
        )}
      </div>
      <div className="btn-group w-100" role="group">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setIsEditing(false)}>
          Close
        </button>
        <button
          type="submit"
          disabled={!(nameIsValid && descriptionIsValid)}
          className="btn btn-primary">
          Save
        </button>
      </div>
    </form>
  )
}
