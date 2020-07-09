const express = require('express');
const bodyParser = require('body-parser');
const PORT = 5000;
const booksRouter = require('./public/routers/books.routers');
const magazinesRouter = require('./public/routers/magazines.routers');

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

//
// CURRENTLY WORKING ON
//  magazines router for DB on zines
app.use('/api/magazines', magazinesRouter);
//
// APP SERVER ON
// -------------
app.listen(PORT, () => {
  console.log(`Listening on PORT: `, PORT);
});
