import mongoose, { Document, Schema } from 'mongoose'

const userSchema = new Schema(
  {
    email: { type: String, require: true, unique: true },
    username: { type: String, require: true },
    password: { type: String, require: true },
    tags: { type: [String], require: true, default: [] }
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
  tags: string[]
}
