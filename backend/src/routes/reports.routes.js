import express from 'express'
import { createNewReport, getAllReports, getSingleReport, removeReport,getMyReports } from '../controllers/reports.controller.js'
import { requireAuth } from '../middleware/auth.middleware.js'
import { upload } from '../middleware/upload.middleware.js'
import { uploadCSVReports } from '../services/csv.service.js'

const router = express.Router()


router.post('/', requireAuth, upload.single("image"), createNewReport)
router.post('/upload-csv', requireAuth, upload.single("file"), uploadCSVReports)
router.get('/', requireAuth, getAllReports)
router.get('/my', requireAuth, getMyReports)
router.get('/:id', requireAuth, getSingleReport)
router.delete('/:id', requireAuth, removeReport)

export default router