# Personal Blog Project

This project is a personal blog application built with **Node.js**, **Express**, and **MongoDB**. It allows a single user to create, manage, and share blog posts.

---

## Features

- **User Authentication:** Secure login system for the blog owner.
- **Content Management:** Admin interface to create, edit, and delete posts.
- **Public View:** A clean interface for visitors to read blog posts.

---

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- **Node.js** (v14 or higher)
- **npm** (usually comes with Node.js)
- **MongoDB** (Make sure it's running locally or you have a connection string for a remote database).

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### 1. Clone the repository

```bash
git clone https://github.com/adityuhh11/web-dev-blog.git
cd web-dev-blog/Blog-Project
```

### 2. Install dependencies

Install the required npm packages.

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the `Blog-Project` directory. You can copy the example file:

```bash
cp .envsample .env
```

Now, open the `.env` file and add the following environment variables:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017
CORS_ORIGIN=*
```

- **PORT:** The port on which the application will run.
- **MONGODB_URI:** The connection string for your MongoDB database.
- **CORS_ORIGIN:** The origin from which you want to allow requests.

### 4. Running the application

Once the dependencies are installed and the environment variables are set, you can start the server.

To run the application in development mode (with hot-reloading):

```bash
npm run dev
```

To run the application in production mode:

```bash
npm start
```

You should now be able to access the application at [http://localhost:3000](http://localhost:3000).

---

## Scripts

- `npm test`: Runs the test suite.
- `npm run dev`: Starts the application in development mode using nodemon.
- `npm start`: Starts the application in production mode.

---

## Dependencies

### Main Dependencies

- **bcrypt:** For hashing passwords.
- **cookieparser:** For parsing cookies.
- **cors:** For enabling Cross-Origin Resource Sharing.
- **dotenv:** For loading environment variables.
- **ejs:** As the template engine.
- **express:** The web framework used.
- **mongoose:** As the ODM for MongoDB.

### Development Dependencies

- **nodemon:** For automatically restarting the server during development.