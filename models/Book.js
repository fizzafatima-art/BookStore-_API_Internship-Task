const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true,
        trim: true // Faltu spaces khatam karne ke liye
    },
    author: { 
        type: String, 
        required: true,
        trim: true 
    },
    price: { 
        type: Number, 
        required: true,
        min: 0 // Price negative nahi ho sakti
    },
    isbn: { 
        type: String, 
        required: true, 
        unique: true 
    },
    publishedDate: { 
        type: Date, 
        required: true 
    },
    // BONUS: Book ko User se connect karne ke liye
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Ye 'User' model ka naam hai
        required: true
    }
}, {
    timestamps: true // Ye automatically createdAt aur updatedAt add kar dega
});

module.exports = mongoose.model('Book', bookSchema);    