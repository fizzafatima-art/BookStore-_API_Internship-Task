import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    // FIXED: Yahan direct Vercel ka link dalna behtar hai taake koi confusion na ho
    const API_URL = "https://book-store-api-internship-task.vercel.app";

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                // Search filter wala bonus bhi handle ho raha hai yahan
                const res = await axios.get(`${API_URL}/api/books?search=${search}`);
                
                // MongoDB se data array mein aata hai, use handle kar rahe hain
                setBooks(res.data.books || res.data);
            } catch (err) { 
                console.error("Fetch error:", err); 
            }
            setLoading(false);
        };

        // Thora delay (Debounce) dene ke liye taake har word par request na jaye (Optional)
        const timeoutId = setTimeout(() => {
            fetchBooks();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [search]); // Jab search change hoga, ye dobara chalega

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <div className="max-w-6xl mx-auto px-4 pt-10">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">Explore Our Collection</h1>
                    <div className="max-w-md mx-auto relative">
                        <input 
                            type="text" 
                            placeholder="Search by title or author..." 
                            className="w-full p-4 pl-12 rounded-2xl border-none shadow-md focus:ring-2 focus:ring-indigo-500 outline-none"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <span className="absolute left-4 top-4 opacity-30">🔍</span>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-indigo-400 font-bold animate-pulse">Fetching Books...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {books.length > 0 ? (
                            books.map(book => <BookCard key={book._id} book={book} />)
                        ) : (
                            <div className="col-span-full text-center text-gray-500">No books found for "{search}"</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;