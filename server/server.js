const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const diaryRoutes = require('./routes/diaryRoutes');
const path = require('path');

// --- THIS IS THE CORRECTED LINE ---
// It tells dotenv to look for the .env file in the same directory as server.js
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Connect to the MongoDB database
connectDB();

// Initialize the Express application
const app = express();

// Middleware to parse JSON bodies.
app.use(express.json());

// Define the main API route.
app.use('/api/diary', diaryRoutes);

// --- Production Deployment ---
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../Client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../Client', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}
module.exports = app;