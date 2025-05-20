import express from 'express'
import { userController } from '~/controller/user.controller'
import { requireAuth } from '~/middleware/auth.middleware'
const router = express.Router()

router.post('/register', userController.register)
router.put('/:id', requireAuth, userController.updateUser)
router.get('/profile', requireAuth, userController.getProfile)


// router.get('/:id/tags', requireAuth, userController.getTags)
// router.put('/:id/tags', requireAuth, userController.createTags)
// router.delete('/:id/tag', requireAuth, userController.deleteTags)
// router.delete('/:id/tags', requireAuth, userController.deleteAllTags)
// router.get('/:id', requireAuth, userController.getUserDetail)



export const routerUser = router