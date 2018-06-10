import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {createStore, combineReducers} from "redux";

import burgerBuilderReducer from "./store/reducers/burgerBuilder-R";

const rootReducer = combineReducers({
  toBurgerBuilderReducer: burgerBuilderReducer
});

const myStore = createStore(rootReducer);

const burgerApp = (
  <Provider store={myStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(burgerApp, document.getElementById('root'));
registerServiceWorker();