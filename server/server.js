const express = require('express');
const bodyParser = require('body-parser');
const PORT = 5000;
const pool = require('./public/modules/pool');

const app = express();

// const booksData = [
//   {
//     title: STRING,
//     author: STRING,
//     published: DATE,
//   }
// ];

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
  const queryText = `SELECT * FROM "books" ORDER BY "title" ASC;`;

  pool
    .query(queryText)
    .then((dbResponse) => {
      res.send(dbResponse.rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.post('/api/books', (req, res) => {
  const book = req.body;
  console.log(book);
  res.send(201);
});

//
// APP SERVER ON
// -----------------
app.listen(PORT, () => {
  console.log(`Listening on PORT: `, PORT);
});
