import { IAuth } from '~/types/auth'

export const authValidator = (data: IAuth) => {
  const error: Partial<IAuth> = {}

  if (!data.email || data.email.trim() === '') {
    error.email = 'Email is required'
  }

  if (!data.password || data.password.trim() === '') {
    error.password = 'Password is required'
  }
  return error
}
