// __webpack_public_path__ = '/dist/';
import './scss/main.scss';

import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import axios from 'axios';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap/dist/css/bootstrap.css';

import { store } from '@store/store';
import App from './app/App';

axios.interceptors.request.use(function (config) {
  const token = store.getState().auth.data.access_token;
  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

render(
  <React.StrictMode>
    <Provider store={ store }>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('app')
);

