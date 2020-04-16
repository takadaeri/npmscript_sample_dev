import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

let app = document.getElementById('react-app');
if (app) {
  ReactDOM.render(
    <App />,
    app
  );
}