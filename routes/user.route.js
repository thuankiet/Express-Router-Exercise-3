const express = require('express');
const shortId = require('shortid');

const db = require('../db.js')

const router = express.Router();

router.get('/', (request, response) => {
  response.render('./users/list.user.pug', {
    users: db.get('users').value(),
    books: db.get('books').value()
  });
});

router.get('/create', (request, response) => {
  response.render('./users/create.user.pug');
});

router.post('/create', (request, response) => {
  var id = shortId.generate();
  db.get('users').push({id: id, userName: request.body.userName}).write();
  response.redirect('/users');
});

router.get('/edit-user/:userId', (request, response) => {
  var userId = request.params.userId;
  db.get('users').value().filter(user => {
    if(user.id === userId) {
      response.render('./users/edit.user.pug', {
        user: user
      })
    }
  })
});

router.get('/delete/:userId', (request, response) => {
  var userId = request.params.userId;
  db.get('users')
    .remove({id: userId})
    .write();
  response.redirect('/users')
})

module.exports = router;