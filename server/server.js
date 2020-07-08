const express = require('express');
const bodyParser = require('body-parser');
const PORT = 5000;
const booksRouter = require('./public/routers/books.routers');
// const pool = require('./public/modules/pool');

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
// ----------
app.use('/api/books', booksRouter);

app.post('/api/books', (req, res) => {
  const book = req.body;
  const queryText = `INSERT INTO "books" ("title", "author", "published")
  VALUES ($1, $2, $3);`;
  console.log(book);
  pool
    .query(queryText, [book.title, book.author, book.published])
    .then((dbResponse) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Yikes it did not work', err);
    });
});

//
// APP SERVER ON
// -------------
app.listen(PORT, () => {
  console.log(`Listening on PORT: `, PORT);
});
