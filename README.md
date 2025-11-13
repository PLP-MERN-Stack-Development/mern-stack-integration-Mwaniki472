🧩 MERN Stack Integration — Full Project (Tasks 1–5)

A complete MERN Stack (MongoDB, Express, React, Node.js) web application that implements RESTful APIs, stateful frontend integration, and advanced features like authentication, file uploads, pagination, and commenting.

📘 Table of Contents

Project Overview

Features

Project Structure

Technologies Used

Backend Setup

Frontend Setup

Environment Variables

API Endpoints

Frontend Functionality

Authentication Flow

Image Uploads

Pagination, Search, & Filtering

Comments Feature

Deployment

Contributing

License

🧠 Project Overview

This project demonstrates end-to-end integration of the MERN stack through a blog-style application.
It includes both backend and frontend logic with:

RESTful APIs (Express + Mongoose)

A React frontend built with Vite

Integration via Axios/Fetch APIs

Advanced UI behavior using React Context and custom hooks.

✨ Features
🔹 Backend

RESTful API (CRUD) for blog posts and categories

Mongoose models with relationships

User authentication (JWT-based)

Input validation with express-validator

Centralized error handling middleware

File uploads (Multer + Cloudinary)

Pagination, search, and filtering support

Comments on blog posts

🔹 Frontend

Responsive React UI (Tailwind CSS)

React Router for navigation

Global state management with Context API

Forms with React Hook Form + Yup validation

Optimistic UI updates

Auth-protected routes

Loading and error states

Theme switcher (Light/Dark mode)

📂 Project Structure

MERN-Stack-Integration/
├── backend/
│   ├── .env
│   ├── package.json
│   └── src/
│       ├── server.js
│       ├── config/
│       │   └── db.js
│       ├── middleware/
│       │   ├── authMiddleware.js
│       │   └── errorMiddleware.js
│       ├── models/
│       │   ├── User.js
│       │   ├── Post.js
│       │   ├── Category.js
│       │   └── Comment.js
│       ├── routes/
│       │   ├── auth.js
│       │   ├── posts.js
│       │   ├── categories.js
│       │   └── comments.js
│       └── utils/
│           └── upload.js
│
└── frontend/
    ├── .env
    ├── vite.config.js
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx
    │   ├── context/
    │   │   ├── AppContext.jsx
    │   │   └── AuthContext.jsx
    │   ├── lib/
    │   │   ├── api.js
    │   │   └── useApi.js
    │   ├── components/
    │   │   ├── Header.jsx
    │   │   ├── PostList.jsx
    │   │   ├── PostForm.jsx
    │   │   ├── PostDetail.jsx
    │   │   ├── Pagination.jsx
    │   │   ├── SearchBar.jsx
    │   │   └── comments/
    │   │       ├── CommentList.jsx
    │   │       └── CommentForm.jsx
    │   ├── styles/
    │   │   └── index.css
    │   └── assets/
    │       └── logo.png


⚙️ Technologies Used
Layer	Tech Stack
Frontend	React, Vite, Tailwind CSS, React Router, React Hook Form, Yup
Backend	Node.js, Express.js, Mongoose, Multer, Cloudinary
Database	MongoDB Atlas
Auth	JWT (JSON Web Tokens)
Validation	express-validator
Dev Tools	Nodemon, dotenv

🚀 Backend Setup
# Navigate to backend
cd backend

# Install dependencies
npm install

# Start development server
npm run dev

Backend runs on:
👉 http://localhost:5000

💻 Frontend Setup

# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Run frontend
npm run dev

Frontend runs on:
👉 http://localhost:5173

🔐 Environment Variables
Backend (backend/.env)

PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/blogDB
JWT_SECRET=yourSecretKey
CLOUDINARY_CLOUD_NAME=yourCloudName
CLOUDINARY_API_KEY=yourApiKey
CLOUDINARY_API_SECRET=yourApiSecret

Frontend (frontend/.env)

VITE_API_BASE_URL=http://localhost:5000/api


📡 API Endpoints

| Method     | Endpoint                | Description                                         |
| ---------- | ----------------------- | --------------------------------------------------- |
| **POST**   | `/api/auth/register`    | Register new user                                   |
| **POST**   | `/api/auth/login`       | Login and receive JWT                               |
| **GET**    | `/api/posts`            | Get all posts (supports pagination, search, filter) |
| **GET**    | `/api/posts/:id`        | Get post by ID                                      |
| **POST**   | `/api/posts`            | Create post *(protected)*                           |
| **PUT**    | `/api/posts/:id`        | Update post *(protected)*                           |
| **DELETE** | `/api/posts/:id`        | Delete post *(protected)*                           |
| **GET**    | `/api/categories`       | List all categories                                 |
| **POST**   | `/api/categories`       | Create category *(protected)*                       |
| **POST**   | `/api/comments/:postId` | Add comment to post *(protected)*                   |
| **GET**    | `/api/comments/:postId` | Get comments for a post                             |

🎨 Frontend Functionality

PostList → Displays paginated, searchable, and filterable posts.

PostDetail → Shows single post with comments.

PostForm → Allows create/edit post (protected route).

Header → Navigation bar with login/logout.

AuthContext → Manages authentication state (JWT-based).

AppContext → Manages global post and category state.

Optimistic UI → UI updates before server response for better UX.

SearchBar → Filters posts by keyword or category.

🔐 Authentication Flow

On registration/login → Server issues a JWT.

Token stored in localStorage and attached to headers via API helper.

Protected routes check token validity before rendering.

AuthContext handles login/logout globally.

🖼️ Image Uploads

Implemented with Multer (server-side file parsing)

Automatically uploaded to Cloudinary

Post schema stores image URL under featuredImage

Frontend <ImageUploader /> handles preview + upload

🔍 Pagination, Search & Filtering

Implemented on backend via query params:

GET /api/posts?page=2&limit=5&search=react&category=frontend

Frontend integrates these features with controlled state and debounced search input.

💬 Comments Feature

Users can add, view, and delete comments on posts.

Comments are linked to posts via Mongoose relationship.

Frontend uses CommentList and CommentForm components.

Optimistic comment submission for seamless UX.

🚀 Deployment
Backend (Render / Railway / Vercel)

Push code to GitHub.

Create a new app in Render.

Add environment variables (MONGO_URI, JWT_SECRET, etc.).

Deploy backend.

Frontend (Netlify / Vercel)

Run npm run build in frontend.

Deploy dist/ folder.

Set environment variable:

VITE_API_BASE_URL=https://<your-backend-app>.onrender.com/api

🧑‍💻 Contributing

Fork this repo

Create a new branch: git checkout -b feature/awesome-feature

Commit changes: git commit -m 'Add awesome feature'

Push branch: git push origin feature/awesome-feature

Open a Pull Request

📄 License

This project is licensed under the MIT License — feel free to modify and use it.

👨‍💻 Author

First.Name Second.Name
💼 Full Stack Developer
📧 email@example.com

🌐 GitHub