import { useFetch } from "../hooks/useFetch"

import type { NewProjectFormDataType, NewTaskFormDataType } from "../types"

export const getAllProjects = async () => {
  const { data, loading, error } = useFetch("get", "projects")
  return { data, loading, error }
}

export const createNewProject = async (
  newProjectFormData: NewProjectFormDataType
) => {
  const { data, loading, error } = useFetch(
    "post",
    "projects",
    newProjectFormData
  )
  return { data, loading, error }
}

export const getProject = async (projectId: string) => {
  const { data, loading, error } = useFetch("get", `projects/${projectId}`)
  return { data, loading, error }
}

export const editProject = async (projectId: string, updateData: object) => {
  const { data, loading, error } = useFetch(
    "patch",
    `projects/${projectId}`,
    updateData
  )
  return { data, loading, error }
}

export const deleteProject = async (projectId: string) => {
  const { data, loading, error } = useFetch("delete", `projects/${projectId}`)
  return { data, loading, error }
}

export const getProjectTasks = async (projectId: string) => {
  const { data, loading, error } = useFetch(
    "get",
    `projects/${projectId}/tasks`
  )
  return { data, loading, error }
}

export const createNewTask = async (
  projectId: string,
  newTaskFormData: NewTaskFormDataType
) => {
  const { data, loading, error } = useFetch(
    "post",
    `projects/${projectId}/tasks`,
    newTaskFormData
  )
  return { data, loading, error }
}

export const getTask = async (projectId: string, taskId: string) => {
  const { data, loading, error } = useFetch(
    "get",
    `projects/${projectId}/tasks/${taskId}`
  )
  return { data, loading, error }
}

export const editTask = async (
  projectId: string,
  taskId: string,
  updateData: object
) => {
  const { data, loading, error } = useFetch(
    "patch",
    `projects/${projectId}/tasks/${taskId}`,
    updateData
  )
  return { data, loading, error }
}

export const deleteTask = async (projectId: string, taskId: string) => {
  const { data, loading, error } = useFetch(
    "delete",
    `projects/${projectId}/tasks/${taskId}`
  )
  return { data, error, loading }
}
