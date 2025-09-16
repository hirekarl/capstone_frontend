import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import axios from "axios"

import type { AuthResponseType, ProjectType, TaskType } from "../types"
import { AuthContext, type AuthContextType } from "../contexts/AuthContext"

import { useLocalStorage } from "./useLocalStorage"

import { VITE_ENDPOINT_BASE_URL } from "../utils"

type MethodType = "get" | "post" | "patch" | "delete"

export const useFetch = (
  method: MethodType,
  endpoint: string,
  updateData?: Object
) => {
  const [userData, _setUserData] = useLocalStorage()
  const [data, setData] = useState<
    | AuthResponseType
    | ProjectType
    | ProjectType[]
    | TaskType
    | TaskType[]
    | null
  >(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const { isAuthenticated } = useContext<AuthContextType>(AuthContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    }
  }, [])

  const url = `${VITE_ENDPOINT_BASE_URL}/${endpoint}`
  const config = {
    method,
    url,
    headers: {
      Authorization: `Bearer ${userData?.token}`,
      "Content-Type": "application/json",
    },
    ...(updateData && { updateData }),
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      axios(config)
        .then((response) => {
          setData(response.data)
        })
        .catch((error) => {
          setData(null)
          if (error.response) {
            setError(error.response.data.message)
          } else {
            setError(String(error))
          }
        })
        .finally(() => {
          setLoading(false)
        })
    }

    fetchData()
  }, [method, endpoint, updateData])

  return { data, loading, error }
}
