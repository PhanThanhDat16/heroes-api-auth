import express from 'express'
import { tagController } from '~/controller/tag.controller'
import { userController } from '~/controller/user.controller'
const router = express.Router()

router.get('/users/:id', userController.findUserById)
router.post('/group/users', userController.getListUserByGroup)
router.post('/users', userController.getListUsersById)
router.post('/tags', tagController.getAllTagById)


export const routerInternal = router
