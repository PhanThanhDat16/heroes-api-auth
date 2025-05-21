import express from 'express'
import { authController } from '~/controller/auth.controller'
const router = express.Router()

router.post('/login', authController.login)
router.post('/refresh-token', authController.refreshToken)
router.post('/access-token', authController.verifyAccessToken)
router.post('/logout', authController.logout)


export const routerAuth = router
