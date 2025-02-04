import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import cors from 'cors'
import { initialProducts } from "./intialProducts.js";


// Categories List
import categories from "./categories.js";

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  selectedCategory: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Product Schema
const productSchema = new mongoose.Schema({
  imageUrl: String,
  title: String,
  price: Number,
  category: String,
});

const Product = mongoose.model("Product", productSchema);


// Inserting Products on Backend
const insertProductsIfNotExist = async () => {
  try {
    for (const product of initialProducts) {
      const existingProduct = await Product.findOne({ title: product.title });
      if (!existingProduct) {
        await Product.create(product);
        console.log(`Inserted: ${product.title}`);
      } else {
        console.log(`Skipped: ${product.title} (Already exists)`);
      }
    }
  } catch (error) {
    console.error("Error inserting products:", error);
  }
};

export default insertProductsIfNotExist

// Load environment variables
dotenv.config();

const app = express();
const PORT = 8000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware
app.use(express.json());
app.use(cors())

// MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then( async() => {
    console.log("MongoDB connected");
    await insertProductsIfNotExist()
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));



// Login API
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, username: user.username, selectedCategory: user.selectedCategory },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});

// Signup API
app.post("/api/signup", async (req, res) => {
    try {
      const { username, password, selectedCategory } = req.body;
      if (!username || !password || !selectedCategory) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const existingUser = await User.findOne({ username });
      if (existingUser) return res.status(400).json({ error: "Username already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword, selectedCategory });
      await newUser.save();

      const user = await User.findOne({ username });
       if (!user) return res.status(404).json({ error: "User not found" });


      const token = jwt.sign(
        { id: user._id, username: user.username, selectedCategory: user.selectedCategory },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      res.status(201).json({ message: "User registered successfully" ,token  });
    } catch (error) {
      res.status(500).json({ error: "Error registering user" });
    }
  });

// Get Categories API
app.get("/api/categories", (req, res) => {
  res.json(categories);
});

// Get Products API
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
});

// Search Products API
app.get("/api/search", async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) return res.status(400).json({ error: "Search term is required" });

    const products = await Product.find({ title: { $regex: name, $options: "i" } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error searching products" });
  }
});

// Root API
app.get("/", (req, res) => {
  res.json({ message: "Good request" });
});
