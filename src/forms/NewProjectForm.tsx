import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import axios from "axios"

import { AuthContext, type AuthContextType } from "../contexts/AuthContext"
import type { NewProjectFormDataType } from "../types"

import { useLocalStorage } from "../hooks/useLocalStorage"
import { VITE_ENDPOINT_BASE_URL } from "../utils"

export default function NewProjectForm() {
  const { isAuthenticated } = useContext<AuthContextType>(AuthContext)
  const [userData, _setUserData] = useLocalStorage()
  const token = userData?.token

  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    }
  }, [isAuthenticated])

  const [newProjectFormData, setNewProjectFormData] =
    useState<NewProjectFormDataType>({
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (nameIsValid && descriptionIsValid) {
      axios
        .post(
          `${VITE_ENDPOINT_BASE_URL}/projects`,
          {
            name: newProjectFormData.name,
            description: newProjectFormData.description,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((_response) => {
          setNewProjectFormData({
            name: "",
            description: "",
          })
          setIsDirty(false)
          navigate("/projects")
        })
        .catch((error) => {
          console.error(error)
        })
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
        className="btn btn-primary w-100"
      >
        Submit
      </button>
    </form>
  )
}
