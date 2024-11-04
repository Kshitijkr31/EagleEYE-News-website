const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connection successful');
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
