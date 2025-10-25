import React from 'react'
import { Link } from 'react-router-dom'

export default function Cart({ cart, removeFromCart, clearCart }) {
  const total = cart.reduce((a,c)=>a+c.qty*c.price,0)
  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? <p>Empty</p> : (
        <div>
          {cart.map(i => (
            <div key={i._id} style={{ display:'flex', gap:12, alignItems:'center', borderBottom:'1px solid #eee', padding:'8px 0' }}>
              <img src={i.image} alt={i.title} width={60} height={60} />
              <div style={{ flex:1 }}>
                <div>{i.title}</div>
                <div>Qty: {i.qty}</div>
              </div>
              <div>${(i.qty * i.price).toFixed(2)}</div>
              <button onClick={()=>removeFromCart(i._id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${total.toFixed(2)}</h3>
          <div style={{ display:'flex', gap:12 }}>
            <button onClick={clearCart}>Clear</button>
            <Link to="/checkout">Checkout</Link>
          </div>
        </div>
      )}
    </div>
  )
}
