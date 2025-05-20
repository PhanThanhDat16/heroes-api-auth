import { Request, Response } from 'express'
import { tagService } from '~/service/tag.service'
import { userService } from '~/service/user.service'
import { EHttpStatus } from '~/types/httpStatus'

export const tagController = {
  getTagsByUserId: async (req: Request, res: Response) => {
    const userId = req.params.id
    try {
      const tags = await tagService.getTagsByUserId(userId)
      if (!tags) {
        res.status(EHttpStatus.NOT_FOUND).json({
          message: 'User not found'
        })
        return
      }

      res.status(EHttpStatus.OK).json({
        message: 'Successfull',
        data: tags
      })
    } catch (error) {
      res.status(EHttpStatus.INTERNAL_SERVER_ERROR).json({
        message: `Internal server error: ${error}`
      })
    }
  },

  createTagsByUserId: async (req: Request, res: Response) => {
    const userId = req.params.id
    const { tag } = req.body
    try {
      const user = await userService.getUserById(userId)
      if (!user) {
        res.status(EHttpStatus.NOT_FOUND).json({
          message: 'User not found'
        })
        return
      }

      const tagUser = await tagService.createTagByUserId(userId, tag)
      if (!tagUser) {
        res.status(EHttpStatus.BAD_REQUEST).json({
          message: 'Tag already exists'
        })
        return
      }

      res.status(EHttpStatus.OK).json({
        message: 'Create tags successfully',
        data: tagUser
      })
    } catch (error) {
      res.status(EHttpStatus.INTERNAL_SERVER_ERROR).json({
        message: `Internal server error: ${error}`
      })
    }
  },

  deleteTagByUserId: async (req: Request, res: Response) => {
    const userId = req.params.userId
    const tagId = req.params.id
    try {
      const user = await userService.getUserById(userId)
      if (!user) {
        res.status(EHttpStatus.NOT_FOUND).json({
          message: 'User not found'
        })
        return
      }

      const tagUser = await tagService.deleteTagByUserId(userId, tagId)
      if (!tagUser) {
        res.status(EHttpStatus.BAD_REQUEST).json({
          message: 'Tag does not exist'
        })
        return
      }

      res.status(EHttpStatus.OK).json({
        message: 'Deleted successfully'
      })
    } catch (error) {
      res.status(EHttpStatus.INTERNAL_SERVER_ERROR).json({
        message: `Internal server error: ${error}`
      })
    }
  },

  deleteAllTagByUserId: async (req: Request, res: Response) => {
    const userId = req.params.id
    const { tags } = req.body
    try {
      const user = await userService.getUserById(userId)
      if (!user) {
        res.status(EHttpStatus.NOT_FOUND).json({
          message: 'User not found'
        })
        return
      }
      const result = await tagService.deleteAllTags(userId, tags)

      res.status(EHttpStatus.OK).json({
        message: 'Tags deleted successfully',
        data: result
      })
    } catch (error) {
      res.status(EHttpStatus.INTERNAL_SERVER_ERROR).json({
        message: `Internal server error: ${error}`
      })
    }
  }
}
