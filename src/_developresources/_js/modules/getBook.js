/**
 * googleBookAPI
 */

const axios = require('axios');

const getBook = () => {
  console.log('book----------------');

  const book = document.querySelector('.js-book');
  

  axios.get('https://www.googleapis.com/books/v1/volumes?q=ムーミン')
    .then(function (response) {
      // handle success
      console.log(response);

      let html = document.createElement('span');
      html.innerHTML = response.data.items[0].id;
      book.appendChild(html);

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });

  setTimeout(() => {
    const img = new Image();
    img.src = '/common/img/online.png';
    book.appendChild(img);
  }, 3000);


};

export default getBook;
