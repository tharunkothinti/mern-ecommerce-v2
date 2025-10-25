import { Router } from 'express'
import { createOrder, myOrders } from '../controllers/orderController.js'
import { auth } from '../middleware/auth.js'
const router = Router()
router.post('/', auth, createOrder)
router.get('/me', auth, myOrders)
export default router
