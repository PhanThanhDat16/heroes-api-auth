import express from 'express'
import { userController } from '~/controller/user.controller'
import { requireAuth } from '~/middleware/auth.middleware'
const router = express.Router()

router.post('/register', userController.register)
router.put('/:id', requireAuth, userController.updateUser)
router.get('/profile', requireAuth, userController.getProfile)
router.get('/:id', requireAuth, userController.getUserDetail)
router.get('/', userController.getAllUser)

export const routerUser = router