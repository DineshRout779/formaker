const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const formRoutes = require('./routes/form');
const connectDB = require('./config/connectDB');

const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// DB connection
connectDB();

// routes
app.get('/', (req, res) => {
  return res.status(200).send('API is working ✅');
});
app.use('/api/v1/form', formRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
