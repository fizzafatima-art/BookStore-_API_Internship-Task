import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-indigo-600 p-4 text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-extrabold tracking-tight hover:text-indigo-200 transition">
                    📚 BookStore
                </Link>
                <div className="space-x-4">
                    <Link to="/" className="hover:text-indigo-200 font-medium">Home</Link>
                    <Link to="/login" className="bg-white text-indigo-600 px-5 py-2 rounded-full font-bold hover:bg-indigo-50 transition">
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;