const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');

app.use(cors());
app.use(bodyParser.json());


const JWT_SECRET = 'your-jwt-secret-key';

// Sample user database
const users = [
    { id: 1, email: 'user1@test.com', password: '$2b$10$xxxxx...', role: 'user' }
];
//لتشفير الباسورد
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: users.length + 1,
        email,
        password: hashedPassword,
        role: 'user'
    };

    users.push(newUser);

    res.json({ message: 'User registered' });
});
// Login route - generate token
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const payload = {
        id: user.id,
        username: user.email,
        role: user.role
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
});

// Middleware for JWT verification
const authenticateJWT = (req, res, next) => {
    // Get auth header - The Authorization header is commonly used to send authentication tokens
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Attach user to request
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

// Protected route
app.get('/profile', authenticateJWT, (req, res) => {
    res.json({ message: 'Profile accessed', user: req.user });
});

// Role-based route
app.get('/admin', authenticateJWT, (req, res) => {
    // Check if user has admin role
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied: admin role required' });
    }

    res.json({ message: 'Admin panel accessed' });
});

// Start server
app.listen(8080, () => {
    console.log('Server running on port 8080');
});