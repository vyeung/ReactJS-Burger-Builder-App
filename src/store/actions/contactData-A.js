import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseSuccess = (id, orderData) => {
  //the id is for debugging and not sent in the order submit object
  return {
    type: actionTypes.PURCHASE_SUCCESS,
    orderId: id,
    orderData: orderData
  };
}

export const purchaseFailure = (error) => {
  return {
    type: actionTypes.PURCHASE_FAILURE,
    error: error
  };
}

//async AC
export const purchaseStart = (orderData) => {
  return dispatch => {
    dispatch(purchaseStart2());

    //adding .json on the end is required when using firebase
    axios.post("/orders.json", orderData)
      //show spinner for at least 2s even if post request is finished first 
      .then(response => {
        setTimeout(() => {
          dispatch(purchaseSuccess(response.data.name, orderData));
        }, 2000);
      })
      .catch(error => {
        dispatch(purchaseFailure(error));
      });
  };
}
export const purchaseStart2 = () => {
  return {
    type: actionTypes.PURCHASE_START
  };
}