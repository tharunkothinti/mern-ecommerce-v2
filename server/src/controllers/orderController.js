import Order from '../models/Order.js'

export async function createOrder(req, res) {
  const { items, amount, currency, stripePaymentIntentId } = req.body
  if (!items?.length) return res.status(400).json({ message: 'No items' })
  const order = await Order.create({
    user: req.user.id,
    items: items.map(i => ({ product: i.product, qty: i.qty, price: i.price })),
    amount,
    currency: currency || 'usd',
    stripePaymentIntentId,
    paymentStatus: 'pending'
  })
  res.status(201).json(order)
}

export async function myOrders(req, res) {
  const orders = await Order.find({ user: req.user.id }).sort('-createdAt').populate('items.product')
  res.json(orders)
}
