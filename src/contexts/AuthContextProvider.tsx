import { useState, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import axios, { type AxiosResponse } from "axios"

import { AuthContext } from "./AuthContext"
import { useLocalStorage } from "../hooks/useLocalStorage"

import type {
  AuthResponseType,
  UserLoginFormData,
  UserRegisterFormData,
} from "../types"

const VITE_ENDPOINT_BASE_URL = import.meta.env.VITE_ENDPOINT_BASE_URL

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useLocalStorage()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!userData)

  const navigate = useNavigate()

  const login = async ({
    email,
    password,
  }: UserLoginFormData): Promise<void> => {
    axios
      .post(`${VITE_ENDPOINT_BASE_URL}/users/login`, {
        email: email,
        password: password,
      })
      .then((response: AxiosResponse) => {
        setUserData(response.data as AuthResponseType)
        setIsAuthenticated(true)
        navigate("/projects")
      })
      .catch((_error) => {
        console.error("There was a problem with login.")
        setUserData(null)
        setIsAuthenticated(false)
        navigate("/login")
      })
  }

  const register = async ({
    username,
    email,
    password,
    passwordConfirm,
  }: UserRegisterFormData): Promise<void> => {
    axios
      .post(`${VITE_ENDPOINT_BASE_URL}/users/register`, {
        username: username,
        email: email,
        password: password,
      })
      .then((response: AxiosResponse) => {
        setUserData(response.data as AuthResponseType)
        setIsAuthenticated(true)
        navigate("/projects")
      })
      .catch((_error) => {
        console.error("There was a problem with user registration.")
        setUserData(null)
        setIsAuthenticated(false)
        navigate("/register")
      })
  }

  const logout = (): void => {
    setUserData(null)
    setIsAuthenticated(false)
    navigate("/login")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
