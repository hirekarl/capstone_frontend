import {
  useContext,
  useState,
  useEffect,
  type ChangeEvent,
  type FormEvent,
} from "react"

import { AuthContext, type AuthContextType } from "../contexts/AuthContext"

import type { UserLoginFormDataType } from "../types"

import { emailRegEx } from "../utils"

export default function LoginForm() {
  const { login } = useContext<AuthContextType>(AuthContext)

  const [userLoginFormData, setUserLoginFormData] =
    useState<UserLoginFormDataType>({ email: "", password: "" })

  const [isDirty, setIsDirty] = useState<boolean>(false)
  const [emailIsValid, setEmailIsValid] = useState<boolean>(false)
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isDirty) {
      setIsDirty(true)
    }

    setUserLoginFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (emailIsValid && passwordIsValid && login !== null) {
      login({
        email: userLoginFormData.email,
        password: userLoginFormData.password,
      })
      setUserLoginFormData({
        email: "",
        password: "",
      })
      setIsDirty(false)
    }
  }

  useEffect(() => {
    setEmailIsValid(userLoginFormData.email.match(emailRegEx) !== null)
    setPasswordIsValid(userLoginFormData.password.length >= 8)
  }, [userLoginFormData])

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email-input">Email</label>
        <input
          id="email-input"
          name="email"
          type="email"
          aria-describedby={!emailIsValid && isDirty ? "email-help" : undefined}
          autoComplete="email"
          onChange={handleChange}
          value={userLoginFormData.email}
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
          autoComplete="off"
          onChange={handleChange}
          value={userLoginFormData.password}
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
      <button
        type="submit"
        disabled={!(emailIsValid && passwordIsValid)}
        className="btn btn-primary w-100">
        Submit
      </button>
    </form>
  )
}
