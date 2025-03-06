
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt:', email);

    try {
        // Perform a case-insensitive search for the email
        const user = await User.findOne({ email: { $regex: new RegExp('^' + email + '$', 'i') } }).exec();
        console.log('User found:', user);
        if (!user) {
            console.log('User not found:', email);
            return res.status(401).json({ message: 'Incorrect email or password' });
        }

        const result = await bcrypt.compare(password, user.password);
        console.log('Password comparison result:', result);
        if (result) {
            console.log('Password match:', email);
            return res.status(200).json({ message: 'Logged in successfully', user });
        } else {
            console.log('Password mismatch:', email);
            return res.status(401).json({ message: 'Incorrect email or password' });
        }
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
