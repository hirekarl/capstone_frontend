import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import axios from "axios"

import { useLocalStorage } from "../hooks/useLocalStorage"
import { AuthContext, type AuthContextType } from "../contexts/AuthContext"

import NewProjectForm from "../forms/NewProjectForm"
import { type ProjectType } from "../types"

import { VITE_ENDPOINT_BASE_URL } from "../utils"

export default function ProjectsPage() {
  const { isAuthenticated } = useContext<AuthContextType>(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    }
  }, [isAuthenticated, navigate])

  const [userData, _setUserData] = useLocalStorage()
  const token = userData?.token

  const [projects, setProjects] = useState<ProjectType[] | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      if (token) {
        try {
          const response = await axios.get(
            `${VITE_ENDPOINT_BASE_URL}/projects`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )
          setProjects(response.data)
        } catch (error) {
          console.error(error)
          setProjects(null)
        }
      }
    }

    fetchProjects()
  }, [token])

  // TODO: Replace the below
  const projectsList = projects?.map((project) => (
    <li key={project._id}>{project.name}</li>
  ))

  return (
    <>
      <div className="container-fluid mt-3">
        <h1 className="mb-5">Projects</h1>
        <div className="row">
          <div className="col-xs-12 col-lg-6 mb-3 mb-lg-0">
            <h2 className="mb-3">Add New Project</h2>
            <NewProjectForm />
          </div>
          <div className="col-xs-12 col-lg-6">
            <h2 className="mb-3">Existing Projects</h2>
            {/* TODO: Replace the below line with the task below it */}
            <ul>{projectsList}</ul>
            {/* Need to import ProjectList here and pass projects/setProjects as prop */}
          </div>
        </div>
      </div>
    </>
  )
}
