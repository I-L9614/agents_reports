import express from 'express'
import { createNewReport, getAllReports } from '../controllers/reports.controller.js'
import { requireAuth } from '../middleware/auth.middleware.js'

const router = express.Router()


router.post('/'. requireAuth, createNewReport)
router.get('/', requireAuth, getAllReports)

export default router