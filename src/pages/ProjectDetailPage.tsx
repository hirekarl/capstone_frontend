import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { useLocalStorage } from "../hooks/useLocalStorage"
import { getProject, getProjectTasks } from "../api/apiController"

import { AuthContext, type AuthContextType } from "../contexts/AuthContext"

import NewTaskForm from "../forms/NewTaskForm"
import { type ProjectType, type TaskType } from "../types"

import TasksList from "../components/TasksList"

export default function ProjectDetailPage() {
  const { projectId } = useParams()
  const { isAuthenticated } = useContext<AuthContextType>(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated || projectId === null) {
      navigate("/login")
    }
  }, [isAuthenticated, projectId, navigate])

  const [projectName, setProjectName] = useState<string | null>(null)
  const [userData] = useLocalStorage()

  const token = userData?.token

  const [tasks, setTasks] = useState<TaskType[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      if (token && projectId) {
        try {
          const project: ProjectType | null = await getProject(token, projectId)
          if (project) {
            setProjectName(project.name)
          } else {
            throw new Error("Couldn't fetch project.")
          }
        } catch (error) {
          setError(String(error))
        }
      }
    }

    fetchProject()
  }, [projectId, token])

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true)
      try {
        if (token) {
          const fetchedTasks = await getProjectTasks(token, projectId as string)
          setTasks(fetchedTasks)
        }
      } catch (error) {
        setError(String(error))
        setTasks(null)
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated) {
      fetchTasks()
    }
  }, [isAuthenticated, token, projectId])

  return (
    <>
      <div className="container-fluid mt-3">
        <h1 className="mb-5">{projectName}</h1>
        <div className="row">
          <div className="col-xs-12 col-lg-6 mb-3 mb-lg-0">
            <h2 className="mb-3">Add New Task</h2>
            <NewTaskForm projectId={projectId as string} setTasks={setTasks} />
          </div>
          <div className="col-xs-12 col-lg-6">
            <h2 className="mb-3">Existing Tasks</h2>
            {loading && <p>Loading tasks...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && tasks && (
              <TasksList tasks={tasks} setTasks={setTasks} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
