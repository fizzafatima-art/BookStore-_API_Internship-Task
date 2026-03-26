const Book = require('../models/Book');

// 1. Create a Book (POST) ✅ UPDATED (with user)
exports.createBook = async (req, res) => {
    try {
        const newBook = new Book({
            ...req.body,   // title, author, price, isbn
            user: req.user // token se aayi hui user ID
        });

        const savedBook = await newBook.save();
        res.status(201).json(savedBook);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// 2. Get All Books (GET) ✅ UPDATED (Search + Pagination)
exports.getAllBooks = async (req, res) => {
    try {
        const { search, page = 1, limit = 10 } = req.query;

        let query = {};
        if (search) {
            query = {
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { author: { $regex: search, $options: 'i' } }
                ]
            };
        }

        const books = await Book.find(query)
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .exec();

        const count = await Book.countDocuments(query);

        res.status(200).json({
            success: true,
            totalBooks: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            books
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 3. Get Single Book by ID (GET)
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 4. Update Book (PUT)
exports.updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// 5. Delete Book (DELETE)
exports.deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);

        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};