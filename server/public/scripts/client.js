console.log('JS is loaded');

$(document).ready(init);

function init() {
  console.log('JQ is loaded');
  // TO DO events
  $('.js-btn-submit').on('click', postNewBook);
  // TO DO: on load - get books from database (ideally render them too)
  getBooksData();
}

//
// EVENT LISTENERS
// ----------------

//
// AJAX REQUESTS (GET, POST, DELETE, PUT)
// ----------------
function getBooksData() {
  $.ajax({
    type: 'GET',
    url: '/api/books',
  })
    .then((response) => {
      console.log('GET - response', response);
      renderBooks(response);
      inputReset();
    })
    .catch((err) => {
      console.log(err);
      console.log('Something went badly, please try again.');
    });
}

function postNewBook() {
  console.log('POST ing -');

  $.ajax({
    type: 'POST',
    url: '/api/books',
    data: {
      title: $('#js-title').val(),
      author: $('#js-author').val(),
      published: $('#js-published').val(),
    },
  })
    .then((response) => {
      console.log(response);
      getBooksData();
    })
    .catch((err) => {
      console.log('Oh no, something is wrong', err);
    });
}
//
// CLIENT/DOM CHANGES
// ----------------
function renderBooks(books) {
  const booksList = books;
  console.log('rendering data');
  $('.js-books').empty();
  for (let book of booksList) {
    $('.js-books').append(`
      <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${moment(book.published).format('MM-DD-YYYY')}</td>
      </tr>`);
  }
}

function inputReset() {
  $('#js-title').val('');
  $('#js-author').val('');
  $('#js-published').val('');
}
