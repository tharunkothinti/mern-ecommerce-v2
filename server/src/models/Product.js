import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 }
}, { timestamps: true })

export default mongoose.model('Product', productSchema)
