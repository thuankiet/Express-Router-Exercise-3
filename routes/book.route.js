const express = require('express');
const shortId = require('shortid');

const db = require('../db.js')

const router = express.Router();

router.get('/', (request, response) => {
  response.render('books.pug', {
    books: db.get('books').value()
  })
});

router.get('/edit-form/:id', (request, response) => {
  var id = request.params.id;
  db.get('books').value().filter(book => {
    if(book.id === id) {
      response.render('edit.books.pug', {
        book: book
      })
    }
  })
});

router.get('/:id/delete', (request, response) => {
  var id = request.params.id;
  db.get('books')
    .remove({ id: id })
    .write();
  response.redirect('/books');
});

router.post('/edit/:id', (request, response) => {
  var id = request.params.id;
  db.get('books')
    .find({ id: id })
    .assign(request.body)
    .write()
  response.redirect('/books');
});

router.post('/', (request, response) => {
  request.body.id = shortId.generate();
  db.get('books').push(request.body).write();
  response.redirect('/books');
});

module.exports = router;