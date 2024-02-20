const mongoose = require('mongoose');

/**
 * Connection to MongoDB
 */
const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://localhost:27017/formaker`);

    console.log('Connected to DB');
  } catch (error) {
    console.error('An error occurred: ', error.message);
  }
};

module.exports = connectDB;
