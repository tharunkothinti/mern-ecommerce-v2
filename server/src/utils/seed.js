import 'dotenv/config'
import { connectDB } from '../config/db.js'
import Product from '../models/Product.js'

async function run() {
  await connectDB(process.env.MONGO_URI)
  await Product.deleteMany({})
  await Product.insertMany([
    { title: 'Classic Tee', description: 'Soft cotton tee', price: 24.99, stock: 100, image: 'https://picsum.photos/seed/t1/600/400' },
    { title: 'Hoodie', description: 'Cozy fleece hoodie', price: 49.99, stock: 60, image: 'https://picsum.photos/seed/h1/600/400' },
    { title: 'Sneakers', description: 'Everyday comfort', price: 79.99, stock: 40, image: 'https://picsum.photos/seed/s1/600/400' }
  ])
  console.log('Seeded products ✔')
  process.exit(0)
}
run().catch(e => { console.error(e); process.exit(1) })
