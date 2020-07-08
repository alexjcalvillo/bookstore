const express = require('express');
const bodyParser = require('body-parser');
const PORT = 5000;

const app = express();

// const booksData = [
//   {
//     title: STRING,
//     author: STRING,
//     published: DATE,
//   }
// ];

const booksData = {
  title: 'Book of Leaves',
  author: 'Mark Z. Danielewski',
  published: '3/7/2000',
};

//
// APP CONFIGURATION
// -----------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// congifure static files to be served at root
app.use(express.static('./server/public'));

//
// APP ROUTES
// -----------------
app.get('/api/books', (req, res) => {
  res.send(booksData);
});

// app.post('/api/books', (req, res) => {

//   res.send(201);
// })

//
// APP SERVER ON
// -----------------
app.listen(PORT, () => {
  console.log(`Listening on PORT: `, PORT);
});
