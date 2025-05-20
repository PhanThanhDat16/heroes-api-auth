import { RefreshToken } from '~/model/refreshToken'

export const refreshTokenService = {
  save: async (token: string, username: string, email: string) => {
    return await RefreshToken.create({ token, username, email })
  },

  exists: async (token: string) => {
    return await RefreshToken.findOne({ token }).lean()
  },

  delete: async (token: string) => {
    return await RefreshToken.deleteOne({ token })
  }
}
