import { createContext } from "react"

import type { UserLoginFormDataType, UserRegisterFormDataType } from "../types"

export interface AuthContextType {
  isAuthenticated: boolean
  login: (({ email, password }: UserLoginFormDataType) => void) | null
  register:
    | (({
        username,
        email,
        password,
        passwordConfirm,
      }: UserRegisterFormDataType) => void)
    | null
  logout: (() => void) | null
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: null,
  register: null,
  logout: null,
})
