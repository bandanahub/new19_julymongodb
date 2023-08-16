const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bookdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => console.error('Connection error', err));

  const bookSchema = new mongoose.Schema({
    id: String,
    title: String,
    author: String
  });

