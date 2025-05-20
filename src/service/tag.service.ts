import { Tag } from '~/model/tag.model'

export const tagService = {
  getTagsByUserId: async (userId: string) => {
    const tags = await Tag.find({ userId }).lean()
    if (!tags) return null
    return tags
  },

  createTagByUserId: async (userId: string, name: string) => {
    const tagResult = await Tag.findOne({ userId, name }).lean()
    if (tagResult) return null

    const tag = await Tag.create({ userId, name })
    // await user.save()
    return tag
  },

  deleteTagByUserId: async (userId: string, tagId: string) => {
    const tagResult = await Tag.findByIdAndDelete({ _id: tagId, userId })
    if (tagResult) return null
    return tagResult
  },

  deleteAllTags: async (id: string, tags: string[]) => {
    const result = await Tag.findByIdAndDelete({ _id: { $in: tags } })
    return result
  }
}
