// backend/controllers/productController.js
const Product = require('../models/Product');

// Get all products
const getProducts = async (req, res) => {
    console.log("Received request to get products"); // Debug line
    try {
        const products = await Product.find({});
        console.log("Products fetched:", products); // Debug line
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error); // Debug line
        res.status(500).json({ message: 'Server error' });
    }
};


// Get a product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Add a new product (Admin only)
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, countInStock, image } = req.body;

        const product = new Product({
            name,
            description,
            price,
            category,
            countInStock,
            image,
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a product (Admin only)
const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, countInStock, image } = req.body;

        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.category = category || product.category;
            product.countInStock = countInStock || product.countInStock;
            product.image = image || product.image;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a product (Admin only)
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.remove();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
};
