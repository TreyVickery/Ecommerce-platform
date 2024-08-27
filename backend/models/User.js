const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false }
}, {
    timestamps: true
});

// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next(); // Skip hashing if the password is not modified
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next(); // Continue with saving the user
    } catch (error) {
        next(error); // Pass the error to the next middleware if hashing fails
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

