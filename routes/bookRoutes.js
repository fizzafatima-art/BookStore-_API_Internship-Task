const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middleware/auth'); // 🔐 Auth middleware

// 📌 Validation Rules
const validateBook = [
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Enter author name'),
    body('price').isNumeric().withMessage('Price should be a number'),
    body('isbn')
        .isLength({ min: 10 })
        .withMessage('ISBN should be at least 10 characters long')
];

// 📌 Validation Checker
const checkValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }
    next();
};

// 📌 Routes

// ✅ Add Book (Auth + Validation)
router.post(
    '/',
    auth,
    validateBook,
    checkValidation,
    bookController.createBook
);

// ✅ Get All Books (Public)
router.get('/', bookController.getAllBooks);

// ✅ Get Single Book (Public)
router.get('/:id', bookController.getBookById);

// ✅ Update Book (Auth + Validation)
router.put(
    '/:id',
    auth,
    validateBook,
    checkValidation,
    bookController.updateBook
);

// ✅ Delete Book (Auth Required)
router.delete('/:id', auth, bookController.deleteBook);

module.exports = router;