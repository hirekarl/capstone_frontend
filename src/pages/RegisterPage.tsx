import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import { AuthContext } from "../contexts/AuthContext"
import type { AuthContextType } from "../contexts/AuthContext"

import RegisterForm from "../forms/RegisterForm"

export default function RegisterPage() {
  const { isAuthenticated } = useContext<AuthContextType>(AuthContext)
  const navigate = useNavigate()

  if (isAuthenticated) {
    navigate("/projects")
  }

  return (
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
  )
}
