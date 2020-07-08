console.log('JS is loaded');

$(document).ready(init);

function init() {
  console.log('JQ is loaded');
  // TO DO events

  // TO DO: on load - get books from database (ideally render them too)
  getBooksData();
}

//
// EVENT LISTENERS
// ----------------

//
// AJAX REQUESTS
// ----------------
function getBooksData() {
  $.ajax({
    type: 'GET',
    url: '/api/books',
  })
    .then((response) => {
      console.log('GET - response', response);
      renderBooks(response);
    })
    .catch((err) => {
      console.log(err);
      console.log('Something went badly, please try again.');
    });
}

//
// CLIENT/DOM CHANGES
// ----------------
function renderBooks(books) {
  // const booksList = books;
  const book = books;
  console.log('rendering data');
  $('.js-books').empty();
  // for (let book of booksList) {
  $('.js-books').append(`
    <tr>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.published}</td>
    </tr>`);
  // }
}
