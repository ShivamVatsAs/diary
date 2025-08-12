const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// This function establishes the connection to the MongoDB database.
const connectDB = async () => {
  try {
    // We use mongoose.connect to establish a connection.
    // The connection string (URI) is stored in an environment variable for security.
    // This prevents hardcoding sensitive information directly in the code.
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // If the connection is successful, log a confirmation message.
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If there's an error during connection, log the error and exit the process.
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit with a non-zero status code to indicate failure.
  }
};

// Export the connectDB function to be used in our main server file.
module.exports = connectDB;
