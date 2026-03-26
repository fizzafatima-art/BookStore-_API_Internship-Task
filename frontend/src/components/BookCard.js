import React from 'react';

const BookCard = ({ book }) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col justify-between h-full">
            <div>
                <div className="w-full h-40 bg-indigo-50 rounded-xl mb-4 flex items-center justify-center text-indigo-300 text-4xl">
                    📖
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-1 truncate">{book.title}</h3>
                <p className="text-indigo-500 font-medium text-sm mb-3 underline decoration-indigo-200">By {book.author}</p>
                <p className="text-gray-500 text-xs italic">ISBN: {book.isbn}</p>
            </div>
            <div className="mt-5 flex justify-between items-center">
                <span className="text-2xl font-black text-green-600">${book.price}</span>
                <button className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-black transition">
                    Details
                </button>
            </div>
        </div>
    );
};

export default BookCard;