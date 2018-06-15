import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createBrowserHistory} from "history/"
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import burgerBuilderReducer from "./store/reducers/burgerBuilder-R";
import contactDataReducer from "./store/reducers/contactData-R";
import myOrdersReducer from "./store/reducers/myOrders-R";
import authReducer from "./store/reducers/auth-R";

//need to use this line when using Redux DevTools and Middleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  toBurgerBuilderReducer: burgerBuilderReducer,
  toContactDataReducer: contactDataReducer,
  toMyOrdersReducer: myOrdersReducer,
  toAuthReducer: authReducer
});

const myStore = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
export const history = createBrowserHistory()

const burgerApp = (
  <Provider store={myStore}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(burgerApp, document.getElementById('root'));
registerServiceWorker();