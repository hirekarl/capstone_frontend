import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "../contexts/AuthContext"
import type { AuthContextType } from "../contexts/AuthContext"

import LoginForm from "../forms/LoginForm"
import AlertMessage from "../components/AlertMessage"

export default function LoginPage() {
  const { isAuthenticated, alertMessage } =
    useContext<AuthContextType>(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/projects")
    }
  }, [isAuthenticated, navigate])

  return (
    <>
      {alertMessage && (
        <AlertMessage type={alertMessage.type} message={alertMessage.message} />
      )}
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-xs-12 col-sm-8 offset-sm-2 col-md-6 offset-md-6 col-lg-4 offset-lg-4">
            <h1 className="text-center">Log In</h1>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  )
}
