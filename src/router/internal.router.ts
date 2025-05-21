import express from 'express'
import { tagController } from '~/controller/tag.controller'
import { userController } from '~/controller/user.controller'
import { tagService } from '~/service/tag.service'
const router = express.Router()

router.get('/users/:id', userController.findUserById)
router.get('/tags', tagController.getAllTagById)


export const routerInternal = router
