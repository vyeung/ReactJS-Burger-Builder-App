import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
import {history} from "../../index";

export const purchaseSuccess = (id) => {
  //the id is for debugging and not sent in the final order object
  return {
    type: actionTypes.PURCHASE_SUCCESS,
    orderId: id
  };
}

export const purchaseFailure = (error) => {
  return {
    type: actionTypes.PURCHASE_FAILURE,
    error: error
  };
}

//async action creator
export const purchaseStart = (orderData) => {
  return (dispatch, getState) => {
    dispatch(purchaseStart2());

    //use token of logged-in user to submit new order via query param
    axios.post("/orders.json?auth=" + getState().toAuthReducer.token, orderData)
      //show spinner for at least 2s even if post request is finished first 
      .then(response => {
        setTimeout(() => {
          dispatch(purchaseSuccess(response.data.name));
          history.push("/");  //redirect to homepage when done
        }, 2000);
      })
      .catch(error => {
        setTimeout(() => {
          dispatch(purchaseFailure(error));
        }, 2000);
      });
  };
}
export const purchaseStart2 = () => {
  return {
    type: actionTypes.PURCHASE_START
  };
}