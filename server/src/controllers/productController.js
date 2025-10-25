import Product from '../models/Product.js'

export async function list(req, res) {
  const products = await Product.find().sort('-createdAt')
  res.json(products)
}

export async function getOne(req, res) {
  const product = await Product.findById(req.params.id)
  if (!product) return res.status(404).json({ message: 'Not found' })
  res.json(product)
}
