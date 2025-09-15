import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import type { AuthResponseType } from "../types"

const LOCAL_STORAGE_KEY = "userData"

export const useLocalStorage = (): [
  AuthResponseType | null,
  Dispatch<SetStateAction<AuthResponseType | null>>
] => {
  const [userData, setUserData] = useState<AuthResponseType | null>(() => {
    try {
      const localStorageUserData = localStorage.getItem(LOCAL_STORAGE_KEY)
      return localStorageUserData
        ? (JSON.parse(localStorageUserData) as AuthResponseType)
        : null
    } catch (error) {
      console.error("Couldn't get user data from localStorage:", error)
      return null
    }
  })

  useEffect(() => {
    try {
      if (userData) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData))
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY)
      }
    } catch (error) {
      console.error("Couldn't save user data to localStorage:", error)
    }
  }, [userData])

  return [userData, setUserData]
}
