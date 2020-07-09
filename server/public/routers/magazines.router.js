const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "magazines" ORDER BY "title" ASC;`;

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
  const magazine = req.body;
  const queryText = `INSERT INTO "magazines" ("title", "issue_number", "pages")
    VALUES ($1, $2, $3);`;

  pool
    .query(queryText, [magazine.title, magazine.issue_number, magazine.pages])
    .then((dbResponse) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Yikes it did not work', err);
    });
});
