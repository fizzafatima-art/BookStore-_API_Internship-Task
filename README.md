# 📚 Bookstore Management System (MERN Stack)

A professional full-stack application for managing a bookstore, featuring User Authentication, RESTful API endpoints, and a modern React UI.

## 🚀 Live Links
- **Frontend UI:** https://book-store-api-internship-task-v93s-ew01etfd6.vercel.app/
- **Backend API:** https://book-store-api-internship-task.vercel.app/
- **GitHub Repo:** https://github.com/fizzafatima-art/BookStore-_API_Internship-Task

---

## 🛠️ Technologies Used
- **Frontend:** React.js, Tailwind CSS, Axios, React Router.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB Atlas (Mongoose).
- **Security:** JWT (JSON Web Tokens) & Bcrypt.js.
- **Validation:** Express-Validator.

---

## 🛣️ API Endpoints & Sample Data

### 1. Authentication
- **POST** `/api/auth/register`
  - **Input:** `
  - {
  "username": "test123",
  "password": "password123"} }`
  - **Output:** `201 Created` with success message.
- **POST** `/api/auth/login`
  - **Input:** `{  "username": "test123",
  "password": "password123" }`
  - **Output:** `200 OK` with JWT Token.

### 2. Books (CRUD)
- **GET** `/api/books`
  - **Query Params:** `?search=Alchemist&page=1`
  - **Output:** Array of book objects.
- **POST** `/api/books` (Protected)
  - **Header:** `Authorization: Bearer <token>`
  - **Input:** `{ "title": "The Alchemist", "author": "Paulo Coelho", "price": 15, "isbn": "9780062315007" }`
- **PUT** `/api/books/:id` (Protected)
  - **Input:** `{ "price": 20 }`
- **DELETE** `/api/books/:id` (Protected)

---

## 💻 How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/fizzafatima-art/BookStore-_API_Internship-Task
cd bookstore-api
