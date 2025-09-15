import { createContext } from "react"

import type { UserLoginFormData } from "../types"

export interface AuthContextType {
  isAuthenticated: boolean
  login: (({ email, password }: UserLoginFormData) => void) | null
  logout: (() => void) | null
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: null,
  logout: null,
})
