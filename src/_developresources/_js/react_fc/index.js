import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/react_fc/App';
import { Provider } from 'react-redux';
import { setupStore } from '@/react_fc/store/Store';
const store = setupStore();

let app = document.getElementById('react-app-fc');
if (app) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    app
  );
}