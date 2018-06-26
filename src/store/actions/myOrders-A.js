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
  return (dispatch, getState) => {
    dispatch(fetchOrdersStart2());
    
    //non-template string version
    //const queryParams = "?auth=" + getState().toAuthReducer.token + "&orderBy=\"userId\"&equalTo=" + "\"" + getState().toAuthReducer.userId + "\"";

    //use token and userId to see orders specific to a user with query params.
    //orderBy is a query param understood by Firebase.
    //note that userId and the id itself must be in ""
    const queryParams = `?auth=${getState().toAuthReducer.token}&orderBy="userId"&equalTo="${getState().toAuthReducer.userId}"`;
    axios.get("./orders.json" + queryParams)
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