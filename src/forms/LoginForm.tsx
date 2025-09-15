import { useContext, useState, useEffect } from "react"

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

import { AuthContext, type AuthContextType } from "../contexts/AuthContext"
import type { UserLoginFormDataType } from "../types"

const emailRegEx = /.+\@.+\..+/

export default function LoginForm() {
  const { login } = useContext<AuthContextType>(AuthContext)
  const [userLoginFormData, setUserLoginFormData] =
    useState<UserLoginFormDataType>({ email: "", password: "" })

  const [emailIsValid, setEmailIsValid] = useState<boolean>(false)
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserLoginFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (emailIsValid && passwordIsValid && login !== null) {
      login({
        email: userLoginFormData.email,
        password: userLoginFormData.password,
      })
    }
  }

  useEffect(() => {
    if (userLoginFormData.email.match(emailRegEx)) {
      setEmailIsValid(true)
    } else {
      setEmailIsValid(false)
    }

    if (userLoginFormData.password.length >= 8) {
      setPasswordIsValid(true)
    } else {
      setPasswordIsValid(false)
    }
  }, [userLoginFormData])

  return (
    <>
      <h1 className="text-center">Log In</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email-input">Email</Form.Label>
          <Form.Control
            id="email-input"
            name="email"
            type="email"
            aria-describedby={emailIsValid ? "" : "email-help"}
            onChange={handleChange}
            value={userLoginFormData.email}
            className={!emailIsValid ? "is-invalid" : "is-valid"}
          />
          {!emailIsValid && (
            <Form.Text id="email-help" className="text-danger">
              Please enter a valid email address.
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="password-input">Password</Form.Label>
          <Form.Control
            id="password-input"
            name="password"
            type="password"
            aria-describedby={passwordIsValid ? "" : "password-help"}
            onChange={handleChange}
            value={userLoginFormData.password}
            className={!passwordIsValid ? "is-invalid" : "is-valid"}
          />
          {!passwordIsValid && (
            <Form.Text id="password-help" className="text-danger">
              Password must be at least eight characters.
            </Form.Text>
          )}
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={!(emailIsValid && passwordIsValid)}
          className="w-100"
        >
          Submit
        </Button>
      </Form>
    </>
  )
}
