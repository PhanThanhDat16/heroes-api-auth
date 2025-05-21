import mongoose, { Document, Schema } from 'mongoose'
import { ITag } from '~/types/tags'

const userSchema = new Schema(
  {
    email: { type: String, require: true, unique: true },
    username: { type: String, require: true },
    password: { type: String, require: true },
    tags: {
      type: [
        {
          userId: { type: String },
          name: { type: String },
          backgroundColor: { type: String },
          color: { type: String }
        }
      ],
      require: true,
      default: []
    }
  },
  {
    versionKey: false,
    strict: true,
    timestamps: true
  }
)

userSchema.index({ email: 1 })

export const User = mongoose.model('User', userSchema)

export interface IUserModel extends Document {
  email: string
  username: string
  password: string
  tags: ITag[]
}
