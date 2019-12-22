/**
 * googleBookAPI
 */

const axios = require('axios');

const getBook = () => {
  console.log('book----------------');

  const book = document.querySelector('.js-book');

  if (book) {

    axios.get('https://www.googleapis.com/books/v1/volumes?q=ムーミン')
      .then(function (response) {
        // handle success
        console.log(response);

        let img = document.createElement('img');
        img.src = response.data.items[0].volumeInfo.imageLinks.thumbnail.replace('http', 'https');
        book.appendChild(img);

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

  }


};

export default getBook;
