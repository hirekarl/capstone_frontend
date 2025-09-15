import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import type { UserLoginFormDataType } from "../types"

import { AuthContext } from "../contexts/AuthContext"
import type { AuthContextType } from "../contexts/AuthContext"

export default function LoginPage() {
  const { isAuthenticated, login } = useContext<AuthContextType>(AuthContext)
  const [userLoginFormData, setUserLoginFormData] =
    useState<UserLoginFormDataType | null>(null)

  const navigate = useNavigate()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  if (isAuthenticated) navigate("/projects")

  return <div>LoginPage</div>
}
