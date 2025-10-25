import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { api, setAuthToken } from './services/api'
import Home from './pages/Home.jsx'
import Product from './pages/Product.jsx'
import Cart from './pages/Cart.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Checkout from './pages/Checkout.jsx'
import Orders from './pages/Orders.jsx'

export default function App() {
  const navigate = useNavigate()
  const [cart, setCart] = useState([])

  function addToCart(product, qty=1) {
    setCart(prev => {
      const existing = prev.find(i => i._id === product._id)
      if (existing) return prev.map(i => i._id === product._id ? { ...i, qty: i.qty + qty } : i)
      return [...prev, { ...product, qty }]
    })
  }
  function removeFromCart(id) { setCart(prev => prev.filter(i => i._id !== id)) }
  function clearCart() { setCart([]) }

  function logout() { setAuthToken(null); navigate('/login') }

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 24 }}>
      <nav style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24 }}>
        <Link to="/">Home</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/cart">Cart ({cart.reduce((a,c)=>a+c.qty,0)})</Link>
        <div style={{ marginLeft: 'auto', display:'flex', gap:12 }}>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <button onClick={logout}>Logout</button>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/product/:id" element={<Product addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}
