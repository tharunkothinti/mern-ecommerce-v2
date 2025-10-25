import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function createIntent(req, res) {
  const { amount, currency = 'usd' } = req.body
  if (!amount || amount <= 0) return res.status(400).json({ message: 'Invalid amount' })
  const intent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // dollars -> cents
    currency,
    automatic_payment_methods: { enabled: true }
  })
  res.json({ clientSecret: intent.client_secret, id: intent.id })
}
