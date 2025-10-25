import React, { useEffect, useState } from 'react'
import { api } from '../services/api'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [error,setError] = useState('')
  useEffect(() => {
    api.get('/api/orders/me')
      .then(res => setOrders(res.data))
      .catch(err => setError(err.response?.data?.message || 'Auth required (login first)'))
  }, [])
  return (
    <div>
      <h1>My Orders</h1>
      {error && <p style={{ color:'crimson' }}>{error}</p>}
      {orders.map(o => (
        <div key={o._id} style={{ border:'1px solid #ddd', padding:12, borderRadius:8, marginBottom:12 }}>
          <div><b>Amount:</b> ${o.amount.toFixed(2)} • <b>Status:</b> {o.paymentStatus}</div>
          <div style={{ marginTop:8 }}>
            {o.items.map(it => (
              <div key={it._id} style={{ display:'flex', gap:8 }}>
                <span>{it.product?.title || 'Product'}</span>
                <span>× {it.qty}</span>
                <span>${(it.price * it.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
