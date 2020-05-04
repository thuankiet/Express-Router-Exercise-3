// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const bodyParser = require('body-parser');

const bookRoute = require('./routes/book.route.js');
const userRoute = require('./routes/user.route.js');
const transactionRoute = require('./routes/transaction.route.js');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get('/', (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.use('/books', bookRoute);
app.use('/users', userRoute);
app.use('/transactions', transactionRoute);

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
