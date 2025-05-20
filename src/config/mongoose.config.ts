import mongoose from 'mongoose'

export default function connectMongoDB() {
  mongoose
    .connect(process.env.DATABASE_URL as string)
    .then(() => console.log('Mongoose connected'))
    .catch((err) => console.log('MongoDB connection error:', err))
}
