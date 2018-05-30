import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from "react-router-dom";

const burgerApp = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(burgerApp, document.getElementById('root'));
registerServiceWorker();