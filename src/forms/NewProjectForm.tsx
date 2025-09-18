import {
  useState,
  useEffect,
  type Dispatch,
  type SetStateAction,
  type FormEvent,
} from "react"

import { useLocalStorage } from "../hooks/useLocalStorage"

import type { ProjectFormDataType, ProjectType } from "../types"

import { createNewProject } from "../api/apiController"

interface NewProjectFormProps {
  setProjects: Dispatch<SetStateAction<ProjectType[] | null>>
}

export default function NewProjectForm({ setProjects }: NewProjectFormProps) {
  const [userData] = useLocalStorage()
  const token = userData?.token

  const [newProjectFormData, setNewProjectFormData] =
    useState<ProjectFormDataType>({
      name: "",
      description: "",
    })

  const [isDirty, setIsDirty] = useState<boolean>(false)

  const [nameIsValid, setNameIsValid] = useState<boolean>(false)
  const [descriptionIsValid, setDescriptionIsValid] = useState<boolean>(false)

  useEffect(() => {
    setNameIsValid(newProjectFormData.name !== "")
    setDescriptionIsValid(newProjectFormData.description !== "")
  }, [newProjectFormData])

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!isDirty) {
      setIsDirty(true)
    }

    setNewProjectFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (nameIsValid && descriptionIsValid && token) {
      try {
        const newProject = await createNewProject(token, newProjectFormData)
        if (newProject) {
          setProjects((prevProjects) =>
            prevProjects ? [...prevProjects, newProject] : [newProject]
          )
          setNewProjectFormData({
            name: "",
            description: "",
          })
          setIsDirty(false)
        } else {
          throw new Error("Couldn't create project.")
        }
      } catch (error) {
        console.error(String(error))
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
          value={newProjectFormData.name}
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
          value={newProjectFormData.description}
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
      <button
        type="submit"
        disabled={!(nameIsValid && descriptionIsValid)}
        className="btn btn-primary w-100">
        Submit
      </button>
    </form>
  )
}
