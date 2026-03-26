import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import './App.css';

// Aapka Vercel Backend URL
const API_URL = "https://book-store-api-internship-task.vercel.app/api/books";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Backend se books fetch karne ka function
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(API_URL);
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          {/* Home page par books pass kar rahe hain */}
          <Route path="/" element={<Home books={books} loading={loading} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;