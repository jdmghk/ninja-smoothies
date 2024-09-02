# Ninja Smoothies

Ninja Smoothies is a simple web application built with Node.js, Express, MongoDB, and EJS templating. The app allows users to sign up, log in, and view a list of smoothies.

## Project Structure

The main components of the project are organized as follows:

- **app.js**: The entry point of the application where the Express server is set up.
- **controllers/**: Contains the logic for handling user authentication (e.g., `authController.js`).
- **middleware/**: Contains middleware for protecting routes (e.g., `authMiddleware.js`).
- **models/**: Contains the Mongoose model for the `User` schema.
- **routes/**: Contains route definitions for user authentication (`authRoutes.js`).
- **views/**: Contains EJS templates for rendering the frontend (`home.ejs`, `login.ejs`, `signup.ejs`, `smoothies.ejs`, etc.).
- **public/**: Contains static assets like CSS and images.

## Features

- **User Authentication**: Users can sign up and log in. Passwords are securely hashed using bcrypt.
- **Protected Routes**: Certain routes are protected and can only be accessed by authenticated users.
- **EJS Templating**: The frontend is rendered using EJS templates, allowing dynamic content to be served.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ninja-smoothies.git
   cd ninja-smoothies


2. Install Dependencies:
   ```bash
   npm install

3.Set up environment variables:

Create a .env file in the root directory and add the following:
   ```bash
   SALT_SECRET=your_salt_secret
   JWT_SECRET=your_jwt_secret
   DB_URI=your_mongo_db_uri

```
4. Run the application:
   ```bash
   npm start

6. Visit http://localhost:3000 in your browser to view the app.



