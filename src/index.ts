import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectMongoDB from './config/mongoose.config'
import { routerAuth } from './router/authAPI.router'
import { routerUser } from './router/userAPI.router'
import { routerInternal } from './router/internal.router'
import { routerTag } from './router/tagAPI.router'

dotenv.config()
connectMongoDB()

const app = express()
app.use(cors())
app.use(morgan('common'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', routerAuth)
app.use('/api/user', routerUser)
app.use('/api', routerTag)

// Internal
app.use('/internal', routerInternal)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
