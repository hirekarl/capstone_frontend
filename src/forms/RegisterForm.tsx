import { useContext, useState, useEffect } from "react"

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

import { AuthContext, type AuthContextType } from "../contexts/AuthContext"
import type { UserRegisterFormDataType } from "../types"

const emailRegEx = /.+\@.+\..+/

export default function RegisterForm() {
  const { register } = useContext<AuthContextType>(AuthContext)
  const [userRegisterFormData, setUserRegisterFormData] =
    useState<UserRegisterFormDataType>({
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    })

  const [usernameIsValid, setUsernameIsValid] = useState<boolean>(false)
  const [emailIsValid, setEmailIsValid] = useState<boolean>(false)
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false)
  const [passwordConfirmIsValid, setPasswordConfirmIsValid] =
    useState<boolean>(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserRegisterFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (
      usernameIsValid &&
      emailIsValid &&
      passwordIsValid &&
      register !== null
    ) {
      register({
        username: userRegisterFormData.username,
        email: userRegisterFormData.email,
        password: userRegisterFormData.password,
        passwordConfirm: userRegisterFormData.passwordConfirm,
      })
    }
  }

  useEffect(() => {
    if (userRegisterFormData.username !== "") {
      setUsernameIsValid(true)
    } else {
      setUsernameIsValid(false)
    }

    if (userRegisterFormData.email.match(emailRegEx)) {
      setEmailIsValid(true)
    } else {
      setEmailIsValid(false)
    }

    if (userRegisterFormData.password.length >= 8) {
      setPasswordIsValid(true)
    } else {
      setPasswordIsValid(false)
    }

    if (
      userRegisterFormData.passwordConfirm !== "" &&
      userRegisterFormData.passwordConfirm === userRegisterFormData.password
    ) {
      setPasswordConfirmIsValid(true)
    } else {
      setPasswordConfirmIsValid(false)
    }
  }, [userRegisterFormData])

  return (
    <>
      <h1 className="text-center">Register</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="username-input">Username</Form.Label>
          <Form.Control
            id="username-input"
            name="username"
            type="text"
            aria-desdcribedby={usernameIsValid ? "" : "username-help"}
            onChange={handleChange}
            value={userRegisterFormData.username}
            className={!usernameIsValid ? "is-invalid" : ""}
          />
          {!usernameIsValid && (
            <Form.Text id="username-help" className="text-danger">
              Please enter a username.
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email-input">Email</Form.Label>
          <Form.Control
            id="email-input"
            name="email"
            type="email"
            aria-describedby={emailIsValid ? "" : "email-help"}
            onChange={handleChange}
            value={userRegisterFormData.email}
            className={!emailIsValid ? "is-invalid" : ""}
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
            value={userRegisterFormData.password}
            className={!passwordIsValid ? "is-invalid" : ""}
          />
          {!passwordIsValid && (
            <Form.Text id="password-help" className="text-danger">
              Password must be at least eight characters.
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="password-confirm-input">Password</Form.Label>
          <Form.Control
            id="password-confirm-input"
            name="passwordConfirm"
            type="password"
            aria-describedby={passwordIsValid ? "" : "password-confirm-help"}
            onChange={handleChange}
            value={userRegisterFormData.passwordConfirm}
            className={!passwordConfirmIsValid ? "is-invalid" : ""}
          />
          {!passwordConfirmIsValid && (
            <Form.Text id="password-confirm-help" className="text-danger">
              Passwords must match.
            </Form.Text>
          )}
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={
            !(
              usernameIsValid &&
              emailIsValid &&
              passwordIsValid &&
              passwordConfirmIsValid
            )
          }
          className="w-100"
        >
          Submit
        </Button>
      </Form>
    </>
  )
}
