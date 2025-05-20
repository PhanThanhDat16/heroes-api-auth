export interface IUser {
  email: string
  username: string
  password: string
}

export interface IUserUpdate {
  email: string
  username: string
  tags?: string[]
}
