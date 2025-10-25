import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../services/api'

export default function Product({ addToCart }) {
  const { id } = useParams()
  const [p, setP] = useState(null)
  useEffect(() => { api.get(`/api/products/${id}`).then(res => setP(res.data)) }, [id])
  if (!p) return <p>Loading...</p>
  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 24 }}>
      <img src={p.image} alt={p.title} style={{ width:'100%', borderRadius:8 }} />
      <div>
        <h1>{p.title}</h1>
        <p>{p.description}</p>
        <h3>${p.price.toFixed(2)}</h3>
        <button onClick={() => addToCart(p,1)}>Add to cart</button>
      </div>
    </div>
  )
}
