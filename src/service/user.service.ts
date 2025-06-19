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

    const user = await User.findByIdAndUpdate(id, data, { new: true })
    return user
  },

  getUserById: async (id: string) => {
    const user = await User.findById(id).select('-password').lean()
    if (!user) return null
    return user
  },

  getAllUser: async (search: string | undefined) => {
    let users
    if (search === undefined || search === null || search.trim() === '') {
      users = await User.find().select('-password').lean()
    } else {
      users = await User.find({ username: { $regex: `^${search}`, $options: 'i' } })
        .select('-password')
        .lean()
    }
    return users
  },

  getListUserById: async (listUserId: string[]) => {
    let data = []
    for (let id of listUserId) {
      const user = await User.findById(id).select('-password').lean()
      data.push(user)
    }
    return data
  },

  getListUserByGroup: async ({ search, listUserId }: { search: string | undefined; listUserId: string[] }) => {
    const users = await User.find({ _id: { $in: listUserId }, username: { $regex: `^${search}`, $options: 'i' } })
      .select('-password')
      .lean()
    return users
  }
}
