import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import { AuthContext } from "../contexts/AuthContext"
import type { AuthContextType } from "../contexts/AuthContext"

import AlertMessage from "../components/AlertMessage"
import RegisterForm from "../forms/RegisterForm"

export default function RegisterPage() {
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
      <Container className="mt-3" fluid>
        <Row>
          <Col
            xs={12}
            sm={{ span: 8, offset: 2 }}
            md={{ span: 6, offset: 3 }}
            lg={{ span: 4, offset: 4 }}
          >
            <RegisterForm />
          </Col>
        </Row>
      </Container>
    </>
  )
}
