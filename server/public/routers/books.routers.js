const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
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

router.post('/', (req, res) => {
  const book = req.body;
  const queryText = `INSERT INTO "books" ("title", "author", "published")
  VALUES ($1, $2, $3);`;

  pool
    .query(queryText, [book.title, book.author, book.published])
    .then((dbResponse) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Yikes it did not work', err);
    });
});

module.exports = router;
