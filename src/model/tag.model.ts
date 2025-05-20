import mongoose, { Schema, Document } from 'mongoose'

const tagSchema = new Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: 'User', require: true },
    name: { type: String, unique: true, require: true },
    backgroundColor: {type: String, require: true},
    color: {type: String, require: true}
  },
  {
    versionKey: false,
    strict: true,
    timestamps: true
  }
)

tagSchema.index({ name: 1 })

export const Tag = mongoose.model('Tag', tagSchema)

export interface ITagModel extends Document {
  userId: string
  name: string
  backgroundColor: string
  color: string
}
