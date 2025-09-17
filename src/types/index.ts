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

export interface ProjectFormDataType {
  name: string
  description: string
}

export type TaskStatusType = "To Do" | "In Progress" | "Done"

export interface TaskType {
  _id: string
  title: string
  description: string
  status: TaskStatusType
  project: string
}

export interface TaskFormDataType {
  title: string
  description: string
  status?: TaskStatusType
}

export type TokenType = string

export interface AuthResponseType {
  user: UserType
  token: TokenType
}

export interface UserLoginFormDataType {
  email: string
  password: string
}

export interface UserRegisterFormDataType {
  username: string
  email: string
  password: string
  passwordConfirm: string
}

export interface AlertMessageType {
  type: "success" | "warning" | "danger"
  message: string
}
