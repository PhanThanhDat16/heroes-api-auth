import { User } from '~/model/user.model'
import { IUser, IUserUpdate } from '~/types/user'

export const userService = {
  registerUser: async (data: IUser) => {
    const existingUser = await User.findOne({ email: data.email }).lean()
    if (existingUser) return null

    const newUser = new User({
      ...data
    })

    await newUser.save()
    const { username, email } = newUser
    return { username, email }
  },

  updateUser: async (id: string, data: IUserUpdate) => {
    const existingEmailUser = await User.findOne({ email: data.email }).lean()
    if (existingEmailUser && existingEmailUser._id.toString() !== id) {
      return false
    }

    console.log('HREOOOOOOO')

    const user = await User.findByIdAndUpdate(id, data, { new: true })
    return user
  },

  getUserById: async (id: string) => {
    const user = await User.findById(id).lean()
    if (!user) return false
    return user
  },







  // getTagsByUserId: async (id: string) => {
  //   const user = await User.findById(id).select('tags')
  //   if (!user) return null
  //   return user.tags
  // },

  // createTagByUserId: async (id: string, tag: string) => {
  //   const user = await User.findById(id)
  //   if (!user) return null
  //   if (user.tags.includes(tag)) {
  //     return null
  //   }
  //   user.tags.push(tag)
  //   await user.save()
  //   return user
  // },

  // deleteAllTags: async (id: string, tags: string[]) => {
  //   const user = await User.findByIdAndUpdate(id, { $pull: { tags: { $in: tags } } }, { new: true })
  //   return user
  // },

  // deleteTagByUserId: async (id: string, tag: string) => {
  //   const user = await User.findById(id)
  //   if (!user) return null
  //   user.tags = user.tags.filter((t) => t !== tag)
  //   await user.save()
  //   return user
  // }
}
