/**
 * googleBookAPI
 */

const axios = require('axios');

const getBook = () => {

  if ('content' in document.createElement('template')) {

    var template = document.querySelector('#productrow');

    if (template) {

      axios.get('https://www.googleapis.com/books/v1/volumes?q=ムーミン')
        .then(function (response) {
          // handle success

          console.log(response);

          // 新しい行を複製して表に挿入します
          var ul = document.querySelector('ul');

          var clone = document.importNode(template.content, true);
          var p = clone.querySelector('p');
          var img = clone.querySelector('img');
          p.textContent = response.data.items[0].volumeInfo.title;
          img.src = response.data.items[0].volumeInfo.imageLinks.thumbnail.replace('http', 'https');
          ul.appendChild(clone);

          var clone2 = document.importNode(template.content, true);
          var p2 = clone2.querySelector('p');
          var img2 = clone2.querySelector('img');
          p2.textContent = response.data.items[1].volumeInfo.title;
          img2.src = response.data.items[1].volumeInfo.imageLinks.thumbnail.replace('http', 'https');
          ul.appendChild(clone2);


        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });

    }
  }


};

export default getBook;
