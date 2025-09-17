import { useContext, useState, useEffect } from "react"

import { AuthContext, type AuthContextType } from "../contexts/AuthContext"

import type { UserRegisterFormDataType } from "../types"

import { emailRegEx } from "../utils"

export default function RegisterForm() {
  const { register } = useContext<AuthContextType>(AuthContext)
  const [userRegisterFormData, setUserRegisterFormData] =
    useState<UserRegisterFormDataType>({
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    })

  const [isDirty, setIsDirty] = useState<boolean>(false)

  const [usernameIsValid, setUsernameIsValid] = useState<boolean>(false)
  const [emailIsValid, setEmailIsValid] = useState<boolean>(false)
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false)
  const [passwordConfirmIsValid, setPasswordConfirmIsValid] =
    useState<boolean>(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isDirty) {
      setIsDirty(true)
    }

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
      passwordConfirmIsValid &&
      register !== null
    ) {
      register({
        username: userRegisterFormData.username,
        email: userRegisterFormData.email,
        password: userRegisterFormData.password,
        passwordConfirm: userRegisterFormData.passwordConfirm,
      })
      setUserRegisterFormData({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
      })
      setIsDirty(false)
    }
  }

  useEffect(() => {
    setUsernameIsValid(userRegisterFormData.username !== "")
    setEmailIsValid(userRegisterFormData.email.match(emailRegEx) !== null)
    setPasswordIsValid(userRegisterFormData.password.length >= 8)
    setPasswordConfirmIsValid(
      userRegisterFormData.passwordConfirm !== "" &&
        userRegisterFormData.passwordConfirm === userRegisterFormData.password
    )
  }, [userRegisterFormData])

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="username-input">Username</label>
        <input
          id="username-input"
          name="username"
          type="text"
          aria-describedby={
            !usernameIsValid && isDirty ? "username-help" : undefined
          }
          onChange={handleChange}
          value={userRegisterFormData.username}
          className={
            isDirty
              ? !usernameIsValid
                ? "form-control is-invalid"
                : "form-control is-valid"
              : "form-control"
          }
        />
        {!usernameIsValid && isDirty && (
          <div id="username-help" className="form-text text-danger">
            Please enter a username.
          </div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="email-input">Email</label>
        <input
          id="email-input"
          name="email"
          type="email"
          aria-describedby={!emailIsValid && isDirty ? "email-help" : undefined}
          onChange={handleChange}
          value={userRegisterFormData.email}
          className={
            isDirty
              ? !emailIsValid
                ? "form-control is-invalid"
                : "form-control is-valid"
              : "form-control"
          }
        />
        {!emailIsValid && isDirty && (
          <div id="email-help" className="form-text text-danger">
            Please enter a valid email address.
          </div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="password-input">Password</label>
        <input
          id="password-input"
          name="password"
          type="password"
          aria-describedby={
            !passwordIsValid && isDirty ? "password-help" : undefined
          }
          onChange={handleChange}
          value={userRegisterFormData.password}
          className={
            isDirty
              ? !passwordIsValid
                ? "form-control is-invalid"
                : "form-control is-valid"
              : "form-control"
          }
        />
        {!passwordIsValid && isDirty && (
          <div id="password-help" className="form-text text-danger">
            Password must be at least eight characters.
          </div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="password-confirm-input">Password (again)</label>
        <input
          id="password-confirm-input"
          name="passwordConfirm"
          type="password"
          aria-describedby={
            !passwordConfirmIsValid && isDirty
              ? "password-confirm-help"
              : undefined
          }
          onChange={handleChange}
          value={userRegisterFormData.passwordConfirm}
          className={
            isDirty
              ? !passwordConfirmIsValid
                ? "form-control is-invalid"
                : "form-control is-valid"
              : "form-control"
          }
        />
        {!passwordConfirmIsValid && isDirty && (
          <div id="password-confirm-help" className="form-text text-danger">
            Passwords must match.
          </div>
        )}
      </div>
      <button
        type="submit"
        disabled={
          !(
            usernameIsValid &&
            emailIsValid &&
            passwordIsValid &&
            passwordConfirmIsValid
          )
        }
        className="btn btn-primary w-100"
      >
        Submit
      </button>
    </form>
  )
}
