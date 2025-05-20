import { Request, Response } from 'express'
import { authValidator } from '~/validator/auth.validator'
import jwt from 'jsonwebtoken'
import { authService } from '~/service/auth.service'
import { IAuthToken } from '~/types/auth'
import { refreshTokenService } from '~/service/refreshToken.service'
import { EHttpStatus } from '~/types/httpStatus'

export const authController = {
  login: async (req: Request, res: Response) => {
    const data = req.body
    try {
      const validatetor = authValidator(data)
      if (Object.keys(validatetor).length > 0) {
        res.status(EHttpStatus.BAD_REQUEST).json({
          message: 'validation error'
        })
        return
      }

      const inforUser = await authService.findOne(data.email)
      if (!inforUser) {
        res.status(EHttpStatus.BAD_REQUEST).json({ message: 'User not found' })
        return
      }

      const userCheckLogin = await authService.checkLoginAuth(data)
      if (!userCheckLogin) {
        res.status(EHttpStatus.BAD_REQUEST).json({ message: 'Incorrect password' })
        return
      }

      delete inforUser['password']

      const dataToken = {
        email: userCheckLogin.email,
        username: userCheckLogin.username
      }

      const accessToken = authController.generateAccessToken(dataToken as IAuthToken)
      const refreshToken = await authController.generateRefreshToken(dataToken as IAuthToken)

      res.status(EHttpStatus.OK).json({
        message: 'Login successfulfly',
        data: {
          ...inforUser,
          accessToken,
          refreshToken
        }
      })
    } catch (error) {
      res.status(EHttpStatus.INTERNAL_SERVER_ERROR).json({
        message: `Internal server error: ${error}`
      })
    }
  },

  refreshToken: async (req: Request, res: Response) => {
    const { refreshToken } = req.body
    try {
      if (!refreshToken) {
        res.status(EHttpStatus.FORBIDDEN).json({ message: 'You are not authenticated' })
        return
      }

      jwt.verify(refreshToken, process.env.SECRETKEY_REFRESHTOKEN as string, async (err: any, user: any) => {
        if (err) {
          res.status(EHttpStatus.FORBIDDEN).json({ message: `Refresh token is not valid ${err}` })
          return
        }
        // console.log(user)

        const tokenExists = await refreshTokenService.exists(refreshToken)
        if (!tokenExists) {
          res.status(EHttpStatus.FORBIDDEN).json({ message: 'Refresh token is not valid' })
          return
        }

        delete user.iat
        delete user.exp

        const newAccessToken = authController.generateAccessToken(user as IAuthToken)
        res.status(EHttpStatus.OK).json({
          accessToken: newAccessToken
        })
      })
    } catch (error) {
      res.status(EHttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error ' + error
      })
    }
  },

  logout: async (req: Request, res: Response) => {
    const { refreshToken } = req.body
    try {
      await refreshTokenService.delete(refreshToken)
      res.status(EHttpStatus.OK).json({ message: 'Logged out successfully' })
    } catch (error) {
      res.status(EHttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error ' + error
      })
    }
  },

  generateAccessToken: (data: IAuthToken) => {
    const accessToken = jwt.sign(data, process.env.SECRETKEY_ACCESSTOKEN as string, {
      expiresIn: parseInt(process.env.EXPIRED_ACCESSTOKEN as string)
    })
    return accessToken
  },

  generateRefreshToken: async (data: IAuthToken) => {
    const refreshToken = jwt.sign(data, process.env.SECRETKEY_REFRESHTOKEN as string, {
      expiresIn: parseInt(process.env.EXPRIED_REFRESHTOKEN as string)
    })

    await refreshTokenService.save(refreshToken, data.email, data.username)

    return refreshToken
  }
}
