import React, {Component} from "react";
import {connect} from "react-redux";
import RealOrder from "../../components/RealOrder/RealOrder";
import axios from "../../axios-orders";
import errorHandler from "../../hoc/ErrorHandler/ErrorHandler";
import * as myOrdersActions from "../../store/actions/myOrders-A";

class MyOrders extends Component {

  componentDidMount() {
    this.props.onFetchOrders();
  }
  
  render() {
    return (
      <div>
        {this.props.globalOrders.map(ord => (
          <RealOrder
            key={ord.id}
            ingreds={ord.ingredients}
            price={ord.price}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    globalOrders: state.toMyOrdersReducer.myOrders
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: () => dispatch(myOrdersActions.fetchOrdersStart())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(MyOrders, axios));