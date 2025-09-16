import { createContext } from "react"

import type {
  UserLoginFormDataType,
  UserRegisterFormDataType,
  AlertMessageType,
} from "../types"

export interface AuthContextType {
  isAuthenticated: boolean
  login: ({ email, password }: UserLoginFormDataType) => Promise<void>
  register: ({
    username,
    email,
    password,
    passwordConfirm,
  }: UserRegisterFormDataType) => Promise<void>
  logout: () => void
  validateToken: () => Promise<void>
  alertMessage: AlertMessageType | null
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  validateToken: async () => {},
  alertMessage: null,
})
