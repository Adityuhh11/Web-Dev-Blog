# Personal Blog Platform

A modern, full-stack blog application built with Node.js, Express, MongoDB, and EJS. This platform allows users to create, read, update, and delete blog posts, along with user authentication and authorization features.

## 🚀 Features

- **User Authentication**
  - Secure user registration and login
  - JWT-based authentication
  - Password hashing with bcrypt
  - Protected routes

- **Blog Management**
  - Create, read, update, and delete blog posts
  - Rich text editing capabilities
  - Responsive design for all devices
  - Categorization and tagging system

- **User Experience**
  - Clean and intuitive interface
  - Real-time form validation
  - Responsive navigation
  - Error handling and user feedback

## 🛠 Tech Stack

- **Frontend**:
  - EJS (Embedded JavaScript templates)
  - CSS3 for styling
  - JavaScript (ES6+)
  - Responsive design

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB with Mongoose ODM

- **Authentication**:
  - JSON Web Tokens (JWT)
  - bcrypt for password hashing
  - Cookie-based sessions

- **Development Tools**:
  - Nodemon for development server
  - Dotenv for environment variables
  - CORS for cross-origin requests

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone [your-repository-url]
   cd Blog-Project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Visit `http://localhost:3000` in your web browser

## 📂 Project Structure

```
Blog-Project/
├── public/              # Static files (CSS, JS, images)
│   ├── styles/          # CSS files
│   └── js/              # Client-side JavaScript
├── src/
│   ├── controllers/     # Request handlers
│   ├── db/              # Database connection
│   ├── middleware/      # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # Route definitions
│   └── utils/           # Utility functions
├── views/               # EJS templates
│   ├── partials/        # Reusable components
│   └── pages/           # Main page templates
├── .env                 # Environment variables
├── app.js               # Express app configuration
├── index.js             # Application entry point
└── package.json         # Project dependencies and scripts
```

## 🔧 Available Scripts

- `npm run dev` - Start the development server with nodemon
- `npm start` - Start the production server

## 👨‍💻 Author

- **Aditya Sai Prem** - [Your GitHub Profile]
