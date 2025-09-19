import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext, type AuthContextType } from "../contexts/AuthContext"

import LoginForm from "../forms/LoginForm"
import AlertMessage from "../components/AlertMessage"
import LoadingMessage from "../components/LoadingMessage"

export default function LoginPage() {
  const { isAuthenticated, alertMessage } =
    useContext<AuthContextType>(AuthContext)
  const navigate = useNavigate()

  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/projects")
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    if (!isAuthenticated && alertMessage) {
      setLoading(false)
    }
  }, [isAuthenticated, alertMessage])

  return (
    <>
      {alertMessage && (
        <AlertMessage type={alertMessage.type} message={alertMessage.message} />
      )}
      {loading && <LoadingMessage component="dashboard" />}
      {!loading && (
        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col-xs-12 col-sm-8 offset-sm-2 col-md-6 offset-md-6 col-lg-4 offset-lg-4">
              <h1 className="text-center">Log In</h1>
              <LoginForm setLoading={setLoading} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
