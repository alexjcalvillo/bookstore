$(document).ready(init);

function init() {
  // TO DO events
  $('.js-book-btn-submit').on('click', postNewBook);
  // TO DO: on load - get books from database (ideally render them too)
  $('.js-zine-btn-submit').on('click', clickedNewZine);
  getBooksData();
  getZinesData();
}

//
// EVENT LISTENERS
// ----------------
function clickedNewZine() {
  console.log('in clickedNewZine');
  postNewZine();
}

//
// AJAX REQUESTS (GET, POST, DELETE, PUT)
// --------------------------------------
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

function postNewZine() {
  console.log('POSTing -');

  $.ajax({
    type: 'POST',
    url: '/api/magazines',
    data: {
      title: $('#js-zine-title').val(),
      issue_number: $('#js-zine-issueNumber').val(),
      pages: $('#js-zine-pages').val(),
    },
  })
    .then((response) => {
      console.log(response);
      getZinesData();
    })
    .catch((err) => {
      console.log('Oh no, something is wrong', err);
    });
}

function getZinesData() {
  $.ajax({
    type: 'GET',
    url: '/api/magazines',
  })
    .then((response) => {
      console.log('GET - response', response);
      renderZines(response);
      // inputReset();
    })
    .catch((err) => {
      console.log(err);
      console.log('Something went badly, please try again.');
    });
}

//
// CLIENT/DOM CHANGES
// -------------------
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

function renderZines(zines) {
  const zinesList = zines;
  console.log('rendering data');
  $('.js-magazines').empty();
  for (let zine of zinesList) {
    $('.js-magazines').append(`
      <tr>
        <td>${zine.title}</td>
        <td>${zine.issue_number}</td>
        <td>${zine.pages}</td>
      </tr>`);
  }
}

function inputReset() {
  $('#js-title').val('');
  $('#js-author').val('');
  $('#js-published').val('');
}
