import React, {Component} from "react";
import {connect} from "react-redux";
import RealOrder from "../../components/RealOrder/RealOrder";
import axios from "../../axios-orders";
import errorHandler from "../../hoc/ErrorHandler/ErrorHandler";
import * as myOrdersActions from "../../store/actions/myOrders-A";

class MyOrders extends Component 
{
  componentDidMount() {
    this.props.onFetchOrders();
  }
  
  deleteOrderHandler = (orderId) => {
    const queryParams = `?auth=${this.props.globalAuthToken}`;
    axios.delete("./orders/" + orderId + ".json" + queryParams)
      .then(response => {
        console.log(response);
        this.props.onFetchOrders(); //update, re-render MyOrders page
      });
  }

  render() {
    return (
      <div>
        {this.props.globalOrders.map(ord => (
          <RealOrder
            key={ord.id}
            ingreds={ord.ingredients}
            price={ord.price}
            clickedDelete={() => this.deleteOrderHandler(ord.id)}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    globalOrders: state.toMyOrdersReducer.myOrders,
    globalAuthToken: state.toAuthReducer.token
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: () => dispatch(myOrdersActions.fetchOrdersStart())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(MyOrders, axios));