import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext, type AuthContextType } from "../contexts/AuthContext"

import { useLocalStorage } from "../hooks/useLocalStorage"

import { type ProjectType } from "../types"

import NewProjectForm from "../forms/NewProjectForm"
import ProjectsList from "../components/ProjectsList"
import LoadingMessage from "../components/LoadingMessage"

import { getAllProjects } from "../api/apiController"

export default function ProjectsPage() {
  const { isAuthenticated } = useContext<AuthContextType>(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    }
  }, [isAuthenticated, navigate])

  const [userData] = useLocalStorage()
  const token = userData?.token

  const [projects, setProjects] = useState<ProjectType[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // const [needsReload, setNeedsReload] = useState<boolean>(false)

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)
      try {
        if (token) {
          const fetchedProjects = await getAllProjects(token)
          setProjects(fetchedProjects)
        }
      } catch (error) {
        setError(String(error))
        setProjects(null)
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated) {
      fetchProjects()
    }
  }, [isAuthenticated, token])

  return (
    <>
      <div className="container-fluid mt-3">
        <h1 className="mb-5">My Projects</h1>
        <div className="row">
          <div className="col-xs-12 col-lg-6 mb-3 mb-lg-0">
            <h2 className="mb-3">Add New Project</h2>
            <NewProjectForm setProjects={setProjects} />
          </div>
          <div className="col-xs-12 col-lg-6">
            <h2 className="mb-3">Existing Projects</h2>
            {loading && <LoadingMessage component="projects" />}
            {error && <p className="text-danger">{error}</p>}
            {!loading && !error && projects && (
              <ProjectsList projects={projects} setProjects={setProjects} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
