const express = require('express');
const { registerUser, authUser, getUserProfile, updateUserProfile } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', authUser); // Ensure authUser is correctly imported and defined
router.post('/register', registerUser); // Ensure registerUser is correctly imported and defined

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

module.exports = router;



