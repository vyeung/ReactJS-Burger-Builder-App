import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import burgerBuilderReducer from "./store/reducers/burgerBuilder-R";
import contactDataReducer from "./store/reducers/contactData-R";

//need to use this line when using Redux DevTools and Middleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  toBurgerBuilderReducer: burgerBuilderReducer,
  toContactDataReducer: contactDataReducer
});

const myStore = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const burgerApp = (
  <Provider store={myStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(burgerApp, document.getElementById('root'));
registerServiceWorker();