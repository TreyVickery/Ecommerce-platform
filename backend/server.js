const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes'); // Import product routes
const userRoutes = require('./routes/userRoutes'); // Import user routes
const { protect } = require('./middleware/authMiddleware'); // Import authentication middleware

dotenv.config(); // Load environment variables from .env file

const app = express();

// Set strictQuery option
mongoose.set('strictQuery', false); // or true, depending on your preference

// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/products', productRoutes); // Route for product-related endpoints
app.use('/api/users', userRoutes); // Route for user-related endpoints

// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server error' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});




