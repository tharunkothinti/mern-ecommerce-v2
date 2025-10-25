import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, setAuthToken } from '../services/api'

export default function Register() {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const navigate = useNavigate()

  async function submit(e){
    e.preventDefault()
    try{
      const { data } = await api.post('/api/auth/register', { name, email, password })
      setAuthToken(data.token)
      navigate('/')
    } catch(err){
      setError(err.response?.data?.message || 'Register failed')
    }
  }

  return (
    <form onSubmit={submit} style={{ maxWidth: 420 }}>
      <h1>Register</h1>
      {error && <p style={{ color:'crimson' }}>{error}</p>}
      <input placeholder="name" value={name} onChange={e=>setName(e.target.value)} />
      <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button>Create account</button>
    </form>
  )
}
