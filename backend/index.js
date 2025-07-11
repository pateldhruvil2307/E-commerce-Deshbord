// Load environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const user = require('./db/users');
const products = require('./db/Product');

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("✅ MongoDB connected");

    // Start server only after DB connected
    app.listen(3000, () => {
        console.log("🚀 Server running on port 3000");
    });
})
.catch((err) => {
    console.error("❌ MongoDB connection error:", err);
});

// ======================
// Routes
// ======================

// Register User
app.post('/register', async (req, res) => {
    try {
        let users = new user(req.body);
        let result = await users.save();
        result = result.toObject();
        delete result.password;
        console.log(result);
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Registration failed" });
    }
});

// Login User (Currently dummy logic, no JWT)
app.post('/login', async (req, res) => {
    try {
        if (req.body.email && req.body.password) {
            let users = await user.findOne(req.body).select('-password');
            if (users) {
                res.json(users);
            } else {
                res.status(404).json({ result: "No user found" });
            }
        } else {
            res.status(400).json({ result: "Email and password required" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Login failed" });
    }
});

// Add Product
app.post("/products", async (req, res) => {
    try {
        let product = new products(req.body);
        let result = await product.save();
        console.log(result);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add product" });
    }
});

// Get All Products
app.get("/product", async (req, res) => {
    try {
        const allProducts = await products.find();
        res.json(allProducts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch products" });
    }
});

// Delete a Product
app.delete("/product/:id", async (req, res) => {
    try {
        const result = await products.deleteOne({ _id: req.params.id });
        console.log(result);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete product" });
    }
});

// Get a Single Product by ID
app.get("/product/:id", async (req, res) => {
    try {
        const result = await products.findOne({ _id: req.params.id });
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch product" });
    }
});

// Update Product
app.put("/product/:id", async (req, res) => {
    try {
        const result = await products.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        );
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update product" });
    }
});

// Search Products
app.get("/search/:key", async (req, res) => {
    try {
        let result = await products.find({
            "$or": [
                { name: { $regex: req.params.key, $options: 'i' } },
                { brand: { $regex: req.params.key, $options: 'i' } }
            ]
        });
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Search failed" });
    }
});
