import express from 'express'
import { tagController } from '~/controller/tag.controller'
const router = express.Router()

router.get('/users/:id/tag', tagController.getTagsByUserId)
router.post('/users/:id/tag', tagController.createTagsByUserId)
router.delete('/users/:userId/tag/:id', tagController.deleteTagByUserId)
router.delete('/users/:id/tags', tagController.deleteAllTagByUserId)


export const routerTag = router