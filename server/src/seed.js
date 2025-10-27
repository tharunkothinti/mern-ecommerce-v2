import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js"; // adjust path if needed

dotenv.config();

const products = [
  {
    title: "Wireless Gaming Mouse",
    price: 49.99,
    description: "Ergonomic RGB mouse with adjustable DPI",
    image: "https://picsum.photos/200/300?mouse",
    category: "Electronics",
    stock: 15,
  },
  {
    title: "Mechanical Keyboard",
    price: 89.99,
    description: "RGB mechanical keyboard with blue switches",
    image: "https://picsum.photos/200/300?keyboard",
    category: "Electronics",
    stock: 10,
  },
  {
    title: "Noise Cancelling Headphones",
    price: 129.99,
    description: "Comfortable over-ear wireless headphones",
    image: "https://picsum.photos/200/300?headphones",
    category: "Audio",
    stock: 8,
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("✅ Database seeded successfully!");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  });
