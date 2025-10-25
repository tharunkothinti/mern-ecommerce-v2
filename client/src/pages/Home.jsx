import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'

export default function Home({ addToCart }) {
  const [products, setProducts] = useState([])
  useEffect(() => { api.get('/api/products').then(res => setProducts(res.data)) }, [])
  return (
    <div>
      <h1>Products</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16 }}>
        {products.map(p => (
          <div key={p._id} style={{ border: '1px solid #ddd', padding: 12, borderRadius: 8 }}>
            <img src={p.image} alt={p.title} style={{ width: '100%', height: 140, objectFit: 'cover' }} />
            <h3>{p.title}</h3>
            <p>${p.price.toFixed(2)}</p>
            <div style={{ display:'flex', gap:8 }}>
              <Link to={`/product/${p._id}`}>View</Link>
              <button onClick={() => addToCart(p,1)}>Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
