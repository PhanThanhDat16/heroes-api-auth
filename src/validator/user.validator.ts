import { IUser } from '~/types/user'

export const userValidator = (data: IUser) => {
  const error: Partial<IUser> = {}

  if (!data.email || data.email.trim() === '') {
    error.email = 'Email is required'
  }

  if (!data.username || data.username.trim() === '') {
    error.username = 'Username is required'
  }

  if (!data.password || data.password.trim() === '') {
    error.password = 'Password is required'
  }
  return error
}
