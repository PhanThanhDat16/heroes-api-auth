import { Request, Response } from 'express'

import { userValidator } from '~/validator/user.validator'
import bcrypt from 'bcrypt'
import { userService } from '~/service/user.service'
import jwt from 'jsonwebtoken'
import { User } from '~/model/user.model'
import { EHttpStatus } from '~/types/httpStatus'


export const userController = {
  register: async (req: Request, res: Response) => {
    const data = req.body
    try {
      const validator = userValidator(data)
      if (Object.keys(validator).length > 0) {
        res.status(EHttpStatus.BAD_REQUEST).json({
          message: 'validation error'
        })
        return
      }
      data.password = await bcrypt.hash(data.password, 10)

      const user = await userService.registerUser(data)
      if (!user) {
        res.status(EHttpStatus.BAD_REQUEST).json({
          message: 'Email already exists'
        })
        return
      }

      res.status(EHttpStatus.OK).json({ message: 'register successfully', data: user })
    } catch (error) {
      res.status(EHttpStatus.INTERNAL_SERVER_ERROR).json({
        message: `Internal server error: ${error}`
      })
    }
  },

  updateUser: async (req: Request, res: Response) => {
    const data = req.body
    const userId = req.params.id
    try {
      const user = await userService.updateUser(userId, data)
      if (!user) {
        res.status(EHttpStatus.BAD_REQUEST).json({
          message: 'Email already exists'
        })
        return
      }

      res.status(EHttpStatus.OK).json({
        message: 'Update successfully',
        data: user
      })
    } catch (error) {
      res.status(EHttpStatus.INTERNAL_SERVER_ERROR).json({
        message: `Internal server error: ${error}`
      })
    }
  },

  getProfile: async (req: Request, res: Response) => {
    const data = req.headers.authorization
    const token = data?.split(' ')[1]

    if (!token) {
      res.status(EHttpStatus.UNAUTHORIZED).json({
        message: 'Token not provided'
      })
      return
    }

    try {
      const decoded: any = jwt.verify(token, process.env.SECRETKEY_ACCESSTOKEN as string)

      const user = await User.findOne({ email: decoded.email }).select('-password')

      res.status(EHttpStatus.OK).json({
        message: 'Get Profile successfully',
        data: user
      })
    } catch (error) {
      res.status(EHttpStatus.INTERNAL_SERVER_ERROR).json({
        message: `Internal server error: ${error}`
      })
    }
  },

  getUserDetail: async( req: Request, res: Response) => {
    const userId = req.params.id
    try {
      const user = userService.getUserById(userId)
      if(!user){
        res.status(EHttpStatus.NOT_FOUND).json({
          message: "User not found"
        })
        return
      }
      
      res.status(EHttpStatus.OK).json({
        data: user
      })
    } catch (error) {
      res.status(EHttpStatus.INTERNAL_SERVER_ERROR).json({
        message: `Internal server error: ${error}`
      })
    }
  },

  findUserById: async (req: Request, res: Response) => {
    const userId = req.params.id
    try {
      const user = await userService.getUserById(userId)
      if (!user) {
        res.status(EHttpStatus.NOT_FOUND).json({
          message: 'User not found'
        })
        return
      }

      res.status(EHttpStatus.OK).json({
        message: 'Find user successfully',
        data: user
      })
    } catch (error) {
      res.status(EHttpStatus.INTERNAL_SERVER_ERROR).json({
        message: `Internal server error: ${error}`
      })
    }
  }



  //  getTags: async (req: Request, res: Response) => {
  //   const userId = req.params.id
  //   try {
  //     const tags = await userService.getTagsByUserId(userId)
  //     if (!tags) {
  //       res.status(EHttpStatus.NOT_FOUND).json({
  //         message: 'User not found'
  //       })
  //       return
  //     }

  //     res.status(EHttpStatus.OK).json({
  //       message: 'Successfull',
  //       data: tags
  //     })
  //   } catch (error) {
  //     res.status(EHttpStatus.INTERNAL_SERVER_ERROR).json({
  //       message: `Internal server error: ${error}`
  //     })
  //   }
  // },

  // createTags: async (req: Request, res: Response) => {
  //   const userId = req.params.id
  //   const { tag } = req.body
  //   try {
  //     const user = await userService.getUserById(userId)
  //     if (!user) {
  //       res.status(EHttpStatus.NOT_FOUND).json({
  //         message: 'User not found'
  //       })
  //       return
  //     }

  //     const tagUser = await userService.createTagByUserId(userId, tag)
  //     if (!tagUser) {
  //       res.status(EHttpStatus.BAD_REQUEST).json({
  //         message: 'Tag already exists'
  //       })
  //       return
  //     }

  //     res.status(EHttpStatus.OK).json({
  //       message: 'Create tags successfully',
  //       data: tagUser
  //     })
  //   } catch (error) {
  //     res.status(EHttpStatus.INTERNAL_SERVER_ERROR).json({
  //       message: `Internal server error: ${error}`
  //     })
  //   }
  // },

  // deleteTags: async (req: Request, res: Response) => {
  //   const userId = req.params.id
  //   const { tag } = req.body
  //   try {
  //     const user = await userService.getUserById(userId)
  //     if (!user) {
  //       res.status(EHttpStatus.NOT_FOUND).json({
  //         message: 'User not found'
  //       })
  //       return
  //     }

  //     const tagUser = await userService.deleteTagByUserId(userId, tag)
  //     if (!tagUser) {
  //       res.status(EHttpStatus.BAD_REQUEST).json({
  //         message: 'Tag does not exist'
  //       })
  //       return
  //     }

  //     res.status(EHttpStatus.OK).json({
  //       message: 'Deleted successfully'
  //     })
  //   } catch (error) {
  //     res.status(EHttpStatus.INTERNAL_SERVER_ERROR).json({
  //       message: `Internal server error: ${error}`
  //     })
  //   }
  // },

  // deleteAllTags: async (req: Request, res: Response) => {
  //   const userId = req.params.id
  //   const { tags } = req.body
  //   try {
  //     const user = await userService.deleteAllTags(userId, tags)
  //     if (!user) {
  //       res.status(EHttpStatus.NOT_FOUND).json({
  //         message: 'User not found'
  //       })
  //       return
  //     }

  //     res.status(EHttpStatus.OK).json({
  //       message: 'Tags deleted successfully',
  //       data: user
  //     })
  //   } catch (error) {
  //     res.status(EHttpStatus.INTERNAL_SERVER_ERROR).json({
  //       message: `Internal server error: ${error}`
  //     })
  //   }
  // },
}
