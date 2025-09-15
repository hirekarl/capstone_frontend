export interface UserType {
  _id: string
  username: string
  email: string
}

export interface ProjectType {
  _id: string
  name: string
  description: string
  owner: string
}

export type TaskStatusType = "To Do" | "In Progress" | "Done"

export interface TaskType {
  _id: string
  title: string
  description: string
  status: TaskStatusType
  project: string
}

export type TokenType = string

export interface AuthResponseType {
  user: UserType
  token: TokenType
}

export interface UserLoginFormData {
  email: string
  password: string
}

export interface UserRegisterFormData {
  username: string
  email: string
  password: string
  passwordConfirm: string
}
