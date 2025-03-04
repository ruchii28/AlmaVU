// const express = require('express');
// const User = require('../models/User');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const router = express.Router();

// router.post('/register', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({ email, password: hashedPassword });
//         await newUser.save();

//         res.status(201).json({ message: 'User created successfully' });
//     } catch (err) {
//         console.error('Error registering user:', err);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             console.log(`User not found for email: ${email}`);
//             return res.status(400).json({ message: 'Invalid email or password' });
//         }

//         console.log(`User found: ${user.email}`);
//         console.log(`Provided password: ${password}`);
//         console.log(`Stored hashed password: ${user.password}`);
//         console.log(`JWT_SECRET: ${process.env.JWT_SECRET}`);

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             console.log(`Password does not match for user: ${email}`);
//             return res.status(400).json({ message: 'Invalid email or password' });
//         }

//         console.log('Password matched');
//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.status(200).json({ token });
//     } catch (err) {
//         console.error('Error logging in:', err);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// module.exports = router;

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
