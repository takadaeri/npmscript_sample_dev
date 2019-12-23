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
          var a = clone.querySelector('a');
          var p = clone.querySelector('p');
          var img = clone.querySelector('img');
          a.href = 'https://books.google.co.jp/books?id=' + response.data.items[0].id;
          a.target = '_blank';
          p.textContent = response.data.items[0].volumeInfo.title;
          img.src = response.data.items[0].volumeInfo.imageLinks.thumbnail.replace('http', 'https');
          ul.appendChild(clone);

          var clone2 = document.importNode(template.content, true);
          var a2 = clone2.querySelector('a');
          var p2 = clone2.querySelector('p');
          var img2 = clone2.querySelector('img');
          a2.href = 'https://books.google.co.jp/books?id=' + response.data.items[1].id;
          a2.target = '_blank';
          p2.textContent = response.data.items[1].volumeInfo.title;
          img2.src = response.data.items[1].volumeInfo.imageLinks.thumbnail.replace('http', 'https');
          ul.appendChild(clone2);

          var clone3 = document.importNode(template.content, true);
          var a3 = clone3.querySelector('a');
          var p3 = clone3.querySelector('p');
          var img3 = clone3.querySelector('img');
          a3.href = 'https://books.google.co.jp/books?id=' + response.data.items[2].id;
          a3.target = '_blank';
          p3.textContent = response.data.items[2].volumeInfo.title;
          img3.src = response.data.items[2].volumeInfo.imageLinks.thumbnail.replace('http', 'https');
          ul.appendChild(clone3);

          var clone4 = document.importNode(template.content, true);
          var a4 = clone4.querySelector('a');
          var p4 = clone4.querySelector('p');
          var img4 = clone4.querySelector('img');
          a4.href = 'https://books.google.co.jp/books?id=' + response.data.items[3].id;
          a4.target = '_blank';
          p4.textContent = response.data.items[3].volumeInfo.title;
          img4.src = response.data.items[3].volumeInfo.imageLinks.thumbnail.replace('http', 'https');
          ul.appendChild(clone4);


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
