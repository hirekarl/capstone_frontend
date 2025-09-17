import { useEffect, useState, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"

import axios, { type AxiosResponse } from "axios"

import { AuthContext } from "./AuthContext"
import { useLocalStorage } from "../hooks/useLocalStorage"

import type {
  AuthResponseType,
  UserLoginFormDataType,
  UserRegisterFormDataType,
  AlertMessageType,
} from "../types"

import { VITE_ENDPOINT_BASE_URL } from "../utils"

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useLocalStorage()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!userData)
  const [alertMessage, setAlertMessage] = useState<AlertMessageType | null>(
    null
  )

  const navigate = useNavigate()

  const login = async ({
    email,
    password,
  }: UserLoginFormDataType): Promise<void> => {
    axios
      .post(`${VITE_ENDPOINT_BASE_URL}/users/login`, {
        email: email,
        password: password,
      })
      .then((response: AxiosResponse) => {
        setUserData(response.data as AuthResponseType)
        setIsAuthenticated(true)
        setAlertMessage(null)
        navigate("/projects")
      })
      .catch((error) => {
        console.error("There was a problem with login:", error)
        setUserData(null)
        setIsAuthenticated(false)
        if (error.response) {
          setAlertMessage({
            type: "danger",
            message: `Couldn't log in: ${error.response.data.message}`,
          })
        } else {
          setAlertMessage({
            type: "danger",
            message: "There was a problem logging you in.",
          })
        }
        navigate("/login")
      })
  }

  const register = async ({
    username,
    email,
    password,
  }: UserRegisterFormDataType): Promise<void> => {
    axios
      .post(`${VITE_ENDPOINT_BASE_URL}/users/register`, {
        username: username,
        email: email,
        password: password,
      })
      .then((response: AxiosResponse) => {
        setUserData(response.data as AuthResponseType)
        setIsAuthenticated(true)
        setAlertMessage(null)
        navigate("/projects")
      })
      .catch((error) => {
        console.error("There was a problem with user registration:", error)
        setUserData(null)
        setIsAuthenticated(false)
        if (error.response) {
          setAlertMessage({
            type: "danger",
            message: `Couldn't register user: ${error.response.data.message}`,
          })
        } else {
          setAlertMessage({
            type: "danger",
            message: "Couldn't register user.",
          })
        }
        navigate("/register")
      })
  }

  const logout = (): void => {
    setUserData(null)
    setIsAuthenticated(false)
    setAlertMessage(null)
    navigate("/login")
  }

  const validateToken = async (): Promise<void> => {
    if (userData?.token) {
      try {
        const response = await axios.get(
          `${VITE_ENDPOINT_BASE_URL}/users/validate`,
          {
            headers: {
              Authorization: `Bearer ${userData.token}`,
            },
          }
        )
        if (response.status === 200) {
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error("Token validation failed:", error)
        setAlertMessage({
          type: "danger",
          message: "Token validation failed. Please log in again.",
        })
        logout()
      }
    } else {
      logout()
    }
  }

  useEffect(() => {
    validateToken()
  })

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        register,
        logout,
        validateToken,
        alertMessage,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
