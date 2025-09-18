import {
  useState,
  useEffect,
  type Dispatch,
  type SetStateAction,
  type FormEvent,
  type ChangeEvent,
} from "react"

import { useLocalStorage } from "../hooks/useLocalStorage"

import type { TaskType, TaskFormDataType } from "../types"

import { createNewTask } from "../api/apiController"

interface NewTaskFormProps {
  projectId: string
  setTasks: Dispatch<SetStateAction<TaskType[] | null>>
}

export default function NewTaskForm({ projectId, setTasks }: NewTaskFormProps) {
  const [userData] = useLocalStorage()
  const token = userData?.token

  const [taskFormData, setTaskFormData] = useState<TaskFormDataType>({
    title: "",
    description: "",
    status: "To Do",
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
        const newTask = await createNewTask(token, projectId, taskFormData)
        if (newTask) {
          setTasks((prevTasks) =>
            prevTasks ? [...prevTasks, newTask] : [newTask]
          )
          setTaskFormData({
            title: "",
            description: "",
            status: "To Do",
          })
          setIsDirty(false)
        } else {
          throw new Error("Couldn't create task.")
        }
      } catch (error) {
        console.error(String(error))
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title-input" className="form-label">
          Title
        </label>
        <input
          id="title-input"
          name="title"
          type="text"
          aria-describedby={!titleIsValid && isDirty ? "title-help" : undefined}
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
            Please enter a task title.
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
      <div className="mb-3">
        <label htmlFor="status-select">Status</label>
        <select
          name="status"
          id="status-select"
          className="form-select"
          value={taskFormData.status}
          onChange={handleChange}>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed" disabled>
            Completed
          </option>
        </select>
      </div>
      <button
        type="submit"
        disabled={!(titleIsValid && descriptionIsValid)}
        className="btn btn-primary w-100">
        Submit
      </button>
    </form>
  )
}
