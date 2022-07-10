// __webpack_public_path__ = '/dist/';
import './scss/main.scss';

import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap/dist/css/bootstrap.css';

import App from './app/App';

render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('app')
);

