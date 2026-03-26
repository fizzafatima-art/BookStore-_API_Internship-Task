const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Routes Import
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');

// Config load
dotenv.config();

const app = express();

// 1. Middlewares (Order bohat zaroori hai!)
app.use(cors()); // Sabse pehle CORS allow karein

// JSON parsing with error handling
app.use(express.json({
    verify: (req, res, buf) => {
        try {
            JSON.parse(buf);
        } catch (e) {
            res.status(400).json({ error: 'Invalid JSON body' });
            throw new Error('Invalid JSON');
        }
    }
}));

app.use(express.urlencoded({ extended: true }));

// 2. Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successfully!"))
    .catch(err => {
        console.error("❌ DB Connection Error:", err.message);
        // Process exit nahi karte taake nodemon chalta rahe aur aap fix kar sakein
    });

// 3. API Routes
app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to Bookstore API is running..." });
});

// Routes middleware
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);

// 4. 404 Route (Agar koi ghalat URL hit kare)
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

// 5. Global Error Handling Middleware
app.use((err, req, res, next) => {
    // Agar JSON parse error ho to ye handle karega
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ success: false, message: "Bad JSON Format" });
    }
    
    console.error("🔥 Server Error:", err.stack);
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: process.env.NODE_ENV === 'development' ? err.message : "Something went wrong"
    });
});

// 6. Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});