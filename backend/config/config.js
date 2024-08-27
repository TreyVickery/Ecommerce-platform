// backend/config/config.js

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce',
    port: process.env.PORT || 5000,
};
