import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

function CheckoutInner({ cart, clearCart }) {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const [error,setError] = useState('')
  const [loading,setLoading] = useState(false)
  const total = cart.reduce((a,c)=>a+c.qty*c.price,0)

  async function pay(){
    if (!stripe || !elements) return
    setLoading(true)

  }

  async function handlePay(e){
    e.preventDefault()
    setError('')
    if (!stripe || !elements) return
    try{
      // 1) Create intent on server
      const { data: intent } = await api.post('/api/payments/create-intent', { amount: total })
      // 2) Confirm on client
      const result = await stripe.confirmCardPayment(intent.clientSecret, {
        payment_method: { card: elements.getElement(CardElement) }
      })
      if (result.error) {
        setError(result.error.message || 'Payment failed')
        return
      }
      // 3) Create order
      const items = cart.map(i => ({ product: i._id, qty: i.qty, price: i.price }))
      await api.post('/api/orders', { items, amount: total, stripePaymentIntentId: intent.id })
      clearCart()
      navigate('/orders')
    } catch(err){
      setError(err.response?.data?.message || 'Payment error')
    }
  }

  return (
    <form onSubmit={handlePay} style={{ maxWidth: 420 }}>
      <h1>Checkout</h1>
      <p>Total: ${total.toFixed(2)}</p>
      {error && <p style={{ color:'crimson' }}>{error}</p>}
      <CardElement options={{ hidePostalCode: true }} />
      <button disabled={!stripe || total<=0}>Pay</button>
    </form>
  )
}

export default function Checkout({ cart, clearCart }){
  const stripePromise = useMemo(() => loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY), [])
  return (
    <Elements stripe={stripePromise}>
      <CheckoutInner cart={cart} clearCart={clearCart} />
    </Elements>
  )
}
