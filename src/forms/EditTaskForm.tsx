import {
  useState,
  useEffect,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  type FormEvent,
} from "react"

import type { TaskType, TaskFormDataType } from "../types"

import { useLocalStorage } from "../hooks/useLocalStorage"

import { editTask } from "../api/apiController"

interface EditTaskFormProps {
  task: TaskType
  setIsEditing: Dispatch<SetStateAction<boolean>>
  setNeedsReload: Dispatch<SetStateAction<boolean>>
}

export default function EditTaskForm({
  task,
  setIsEditing,
  setNeedsReload,
}: EditTaskFormProps) {
  const [userData] = useLocalStorage()
  const token = userData?.token

  const [taskFormData, setTaskFormData] = useState<TaskFormDataType>({
    title: task.title,
    description: task.description,
    status: task.status,
  })

  const [isDirty, setIsDirty] = useState<boolean>(false)

  const [titleIsValid, setTitleIsValid] = useState<boolean>(false)
  const [descriptionIsValid, setDescriptionIsValid] = useState<boolean>(false)

  useEffect(() => {
    setTitleIsValid(taskFormData.title !== "")
    setDescriptionIsValid(taskFormData.description !== "")
  }, [taskFormData])

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (!isDirty) {
      setIsDirty(true)
    }

    setTaskFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (titleIsValid && descriptionIsValid && token) {
      try {
        await editTask(token, task.project, task._id, taskFormData)
        setIsEditing(false)
        setNeedsReload((prevNeedsReload) => !prevNeedsReload)
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="mb-3">
          <label htmlFor="title-input" className="form-label">
            Title
          </label>
          <input
            id="title-input"
            name="title"
            type="text"
            aria-describedby={
              !titleIsValid && isDirty ? "title-help" : undefined
            }
            autoComplete="off"
            onChange={handleChange}
            value={taskFormData.title}
            className={
              isDirty
                ? !titleIsValid
                  ? "form-control is-invalid"
                  : "form-control is-valid"
                : "form-control"
            }
          />
          {!titleIsValid && isDirty && (
            <div id="title-help" className="text-danger form-text">
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
            value={taskFormData.description}
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
            disabled={!(titleIsValid && descriptionIsValid)}
            className="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </form>
  )
}
