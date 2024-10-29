const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

//Signup
router.post('/Signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({ username, email, password });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: '1h' });
        res.status(201).json({ token });
    }   catch (err) {
        res.status(400).json({ error: 'User Signup failed' });
    }
});

//Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        }   else {
            res.status(400).json({ error: 'Invalid credentials' });
        }
    }   catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;