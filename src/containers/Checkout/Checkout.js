import React, {Component} from "react";
import CheckoutSummary from "../../components/RealOrder/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
  state = {
    checkoutIngreds: {
      lettuce: 1,
      bacon: 1,
      cheese: 1,
      beef: 1
    }
  }

  render() {
    return (
      <div>
        <CheckoutSummary checkoutIngreds={this.state.checkoutIngreds}/>
      </div>
    );
  }
}

export default Checkout;