import React, { Component } from 'react';
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import MyOrders from "./containers/MyOrders/MyOrders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as authActions from "./store/actions/auth-A";

class App extends Component {
  //using DidMount() causes a bug when reloading My Orders page
  componentWillMount() {
    this.props.onTryAutoSignIn();
  }

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

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignIn: () => dispatch(authActions.checkAuthState())
  };
}

export default withRouter(connect(null, mapDispatchToProps)(App));
