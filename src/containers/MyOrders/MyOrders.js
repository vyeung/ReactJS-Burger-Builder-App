import React, {Component} from "react";
import RealOrder from "../../components/RealOrder/RealOrder";

class MyOrders extends Component {
  render() {
    return (
      <div>
        <RealOrder />
        <RealOrder />
      </div>
    );
  }
}

export default MyOrders;