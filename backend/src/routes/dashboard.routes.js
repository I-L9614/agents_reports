import express from 'express'
import {getStates} from '../controllers/dashboard.controller.js'
import {requireAuth} from '../middlewares/auth.middleware.js'
import {requireRole} from '../middlewares/role.middleware.js'

const router = express.Router()

router.get('/', requireAuth,requireRole('admin'),getStates)

export default router

