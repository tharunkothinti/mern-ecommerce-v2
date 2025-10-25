import { Router } from 'express'
import { createIntent } from '../controllers/paymentController.js'
import { auth } from '../middleware/auth.js'
const router = Router()
router.post('/create-intent', auth, createIntent)
export default router
