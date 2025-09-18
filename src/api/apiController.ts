import axios from "axios"

import type {
  ProjectType,
  ProjectFormDataType,
  TaskType,
  TaskFormDataType,
} from "../types"

import { VITE_ENDPOINT_BASE_URL } from "../utils"

const apiClient = axios.create({
  baseURL: VITE_ENDPOINT_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export const getAllProjects = async (
  token: string
): Promise<ProjectType[] | null> => {
  try {
    const response = await apiClient.get("projects", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const createNewProject = async (
  token: string,
  projectFormData: ProjectFormDataType
): Promise<ProjectType | null> => {
  try {
    const response = await apiClient.post("projects", projectFormData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getProject = async (
  token: string,
  projectId: string
): Promise<ProjectType | null> => {
  try {
    const response = await apiClient.get(`projects/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const editProject = async (
  token: string,
  projectId: string,
  updateData: object
): Promise<ProjectType | null> => {
  try {
    const response = await apiClient.patch(
      `projects/${projectId}`,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const deleteProject = async (
  token: string,
  projectId: string
): Promise<ProjectType | null> => {
  try {
    const response = await apiClient.delete(`projects/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getProjectTasks = async (
  token: string,
  projectId: string
): Promise<TaskType[] | null> => {
  try {
    const response = await apiClient.get(`projects/${projectId}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const createNewTask = async (
  token: string,
  projectId: string,
  taskFormData: TaskFormDataType
): Promise<TaskType | null> => {
  try {
    const response = await apiClient.post(
      `projects/${projectId}/tasks`,
      taskFormData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getTask = async (
  token: string,
  projectId: string,
  taskId: string
): Promise<TaskType | null> => {
  try {
    const response = await apiClient.get(
      `projects/${projectId}/tasks/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const editTask = async (
  token: string,
  projectId: string,
  taskId: string,
  updateData: object
): Promise<TaskType | null> => {
  try {
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
  } catch (error) {
    console.error(error)
    return null
  }
}

export const deleteTask = async (
  token: string,
  projectId: string,
  taskId: string
): Promise<TaskType | null> => {
  try {
    const response = await apiClient.delete(
      `projects/${projectId}/tasks/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}
