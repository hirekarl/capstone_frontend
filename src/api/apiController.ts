import axios from "axios"
import type { ProjectFormDataType, TaskFormDataType } from "../types"
import { VITE_ENDPOINT_BASE_URL } from "../utils"

const apiClient = axios.create({
  baseURL: VITE_ENDPOINT_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export const getAllProjects = async (token: string) => {
  const response = await apiClient.get("projects", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const createNewProject = async (
  token: string,
  newProjectFormData: ProjectFormDataType
) => {
  const response = await apiClient.post("projects", newProjectFormData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const getProject = async (token: string, projectId: string) => {
  const response = await apiClient.get(`projects/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const editProject = async (
  token: string,
  projectId: string,
  updateData: object
) => {
  const response = await apiClient.patch(`projects/${projectId}`, updateData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const deleteProject = async (token: string, projectId: string) => {
  const response = await apiClient.delete(`projects/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const getProjectTasks = async (token: string, projectId: string) => {
  const response = await apiClient.get(`projects/${projectId}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const createNewTask = async (
  token: string,
  projectId: string,
  newTaskFormData: TaskFormDataType
) => {
  const response = await apiClient.post(
    `projects/${projectId}/tasks`,
    newTaskFormData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response.data
}

export const getTask = async (
  token: string,
  projectId: string,
  taskId: string
) => {
  const response = await apiClient.get(
    `projects/${projectId}/tasks/${taskId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response.data
}

export const editTask = async (
  token: string,
  projectId: string,
  taskId: string,
  updateData: object
) => {
  const response = await apiClient.patch(
    `projects/${projectId}/tasks/${taskId}`,
    updateData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response.data
}

export const deleteTask = async (
  token: string,
  projectId: string,
  taskId: string
) => {
  const response = await apiClient.delete(
    `projects/${projectId}/tasks/${taskId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response.data
}
