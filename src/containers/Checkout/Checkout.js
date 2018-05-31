import React, {Component} from "react";
import {Route} from "react-router-dom";
import CheckoutSummary from "../../components/RealOrder/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    checkoutIngreds: {
      lettuce: 0,
      bacon: 0,
      cheese: 0,
      beef: 0
    },
    checkoutPrice: 0
  }

  componentDidMount() {
    this.setState({checkoutIngreds: this.props.location.state.ingredients});
    this.setState({checkoutPrice: this.props.location.state.totalPrice});
  }
  
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  }

  render() {
    //console.log(this.props);
    return (
      <div>
        <CheckoutSummary 
          checkoutIngreds={this.state.checkoutIngreds}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />

        <Route 
          path={this.props.match.url + "/contact-data"} 
          render={() => <ContactData checkoutIngreds={this.state.checkoutIngreds} checkoutPrice={this.state.checkoutPrice}/>}
        />
      </div>
    );
  }
}

export default Checkout;