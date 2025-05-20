import express from 'express'
import { userController } from '~/controller/user.controller'
const router = express.Router()

router.get('/users/:id', userController.findUserById)

export const routerInternal = router
