import { colorPalette } from '~/constants/color-palette.constant'
import { Tag } from '~/model/tag.model'
import { ITag } from '~/types/tags'

export const tagService = {
  getTagById: async (tagIds: string[])=>{
    const tags = await Tag.find({_id: {$in : tagIds}})
    return tags 
  },

  getTagsByUserId: async (userId: string) => {
    const tags = await Tag.find({ userId }).lean()
    if (!tags) return null
    return tags
  },

  createTagByUserId: async (userId: string, name: string) => {
    const tagResult = await Tag.findOne({ userId, name }).lean()
    if (tagResult) return null

    const index = Math.floor(Math.random() * colorPalette.length)
    const data : ITag = {
      userId,
      name,
      backgroundColor: colorPalette[index].background,
      color: colorPalette[index].color
    }
    const tag = await Tag.create(data)
    return tag
  },

  deleteTagByUserId: async (userId: string, tagId: string) => {
    const tagResult = await Tag.findByIdAndDelete({ _id: tagId, userId })
    if (!tagResult) return null
    return tagResult
  },

  deleteAllTags: async (userId: string) => {
    const result = await Tag.deleteMany({userId})
    return result
  },
  
}
