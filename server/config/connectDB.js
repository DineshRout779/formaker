const mongoose = require('mongoose');

/**
 * Connection to MongoDB
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log('Connected to DB');
  } catch (error) {
    console.error('An error occurred: ', error.message);
  }
};

module.exports = connectDB;
