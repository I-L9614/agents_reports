import express from 'express'
import { createAgent,getUsers, deleteUser } from '../controllers/users.controller.js'
import { requireAuth } from '../middleware/auth.middleware.js'
import { requireRole } from '../middleware/role.middleware.js'

const router = express.Router()

router.post('/', requireAuth, requireRole('admin'), createAgent)
router.get('/', requireAuth, requireRole('admin'), getUsers)
router.delete('/:id', requireAuth, requireRole('admin'), deleteUser)

export default router