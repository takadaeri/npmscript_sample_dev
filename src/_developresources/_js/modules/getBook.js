// googleBookAPI

const axios = require('axios');

const getBook = () => {

  if ('content' in document.createElement('template')) {
    let template = document.querySelector('#productrow');
    if (template) {
      axios.get('https://www.googleapis.com/books/v1/volumes?q=ムーミン')
        .then(function (response) {

          console.log(response);

          let ul = document.querySelector('.js-booklist');
          for (let i = 0; i < 4; i++) {
            let clone = document.importNode(template.content, true);
            let a = clone.querySelector('a');
            let p = clone.querySelector('p');
            let img = clone.querySelector('img');
            a.href = 'https://books.google.co.jp/books?id=' + response.data.items[i].id;
            a.target = '_blank';
            p.textContent = response.data.items[i].volumeInfo.title;
            img.src = response.data.items[i].volumeInfo.imageLinks.thumbnail.replace('http://','https://');
            ul.appendChild(clone);
          }
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    }
  }

};

export default getBook;
