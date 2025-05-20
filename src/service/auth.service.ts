import bcrypt from 'bcryptjs'
// import axios from 'axios'
import { IAuth } from '~/types/auth'
import { User } from '~/model/user.model'

export const authService = {
  checkLoginAuth: async (data: IAuth) => {
    const existingUser = await User.findOne({ email: data.email }).lean()
    if (!existingUser) return null

    const passwordMatch = await bcrypt.compare(data.password, existingUser.password as string)
    if (!passwordMatch) return null

    return existingUser
  },

  findOne: async (email: string) => {
    const existingUser = await User.findOne({ email }).lean()
    if (!existingUser) return null

    return existingUser
  }
}
