import React, {Component} from "react";
import CheckoutSummary from "../../components/RealOrder/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
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
          checkoutIngreds={this.props.history.location.state}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
      </div>
    );
  }
}

export default Checkout;