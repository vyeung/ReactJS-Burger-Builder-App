import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import MyOrders from "./containers/MyOrders/MyOrders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/my-orders" component={MyOrders} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
        </Layout>
      </div>
    );
  }
}

export default App;
