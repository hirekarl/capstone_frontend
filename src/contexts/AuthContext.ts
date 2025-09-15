import { createContext } from "react"

import type { UserLoginFormData, UserRegisterFormData } from "../types"

export interface AuthContextType {
  isAuthenticated: boolean
  login: (({ email, password }: UserLoginFormData) => void) | null
  register:
    | (({
        username,
        email,
        password,
        passwordConfirm,
      }: UserRegisterFormData) => void)
    | null
  logout: (() => void) | null
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: null,
  register: null,
  logout: null,
})
