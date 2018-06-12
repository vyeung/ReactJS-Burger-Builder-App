import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const fetchOrdersSuccess = (fetchedOrders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: fetchedOrders
  };
}

export const fetchOrdersFailure = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILURE,
    error: error
  };
}

export const fetchOrdersStart = () => {
  return dispatch => {
    dispatch(fetchOrdersStart2());
    axios.get("./orders.json")
      .then(response => {
        const fetchedOrders = [];
        for(var key in response.data) {
          //push an object with all the original data and a new id field we made
          fetchedOrders.push({...response.data[key], id:key});
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(error => {
        dispatch(fetchOrdersFailure(error));
      });
  };
}
export const fetchOrdersStart2 = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
}