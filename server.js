const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/bookdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => console.error('Connection error', err));

const bookSchema = new mongoose.Schema({
  id: String,
  title: String,
  author: String
});

const Book = mongoose.model('Book', bookSchema);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/books', (req, res) => {
  Book.find()
    .then(books => res.json(books))
    .catch(err => res.status(500).send(err));
});

app.post('/books', (req, res) => {
  const newBook = new Book(req.body);
  newBook.save()
    .then(() => res.status(201).send(newBook))
    .catch(err => res.status(500).send(err));
});

app.put('/books/:id', (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.send())
    .catch(err => res.status(404).send(err));
});

app.delete('/books/:id', (req, res) => {
  Book.findByIdAndRemove(req.params.id)
    .then(() => res.send())
    .catch(err => res.status(404).send(err));
});

app.listen(3001, () => console.log('Server running on port 3001'));
