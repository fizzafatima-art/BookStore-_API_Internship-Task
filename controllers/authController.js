const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. SIGNUP
exports.signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Password ko hash (encrypt) karna
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User created successfully!" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// 2. LOGIN
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Token banana (Ye frontend ko login rakhne ke liye hai)
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, username: user.username });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};