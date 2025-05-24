import express from 'express'
import { tagController } from '~/controller/tag.controller'
const router = express.Router()

router.get('/users/:id/tag', tagController.getTagsByUserId)
router.post('/users/:id/tag', tagController.createTagsByUserId)
router.delete('/users/:userId/tag/:id', tagController.deleteTagByUserId)
router.delete('/users/:id/tags', tagController.deleteAllTagByUserId)

router.put('/users/:id/heroes/tags', tagController.updateTagMultipleHeroes)
router.delete('/users/:id/heroes/tags', tagController.deleteTagMultipleHeroes)



export const routerTag = router