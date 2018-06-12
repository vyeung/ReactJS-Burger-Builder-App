import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

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
  return dispatch => {
    dispatch(purchaseStart2());
    //adding .json on the end is required when using firebase
    axios.post("/orders.json", orderData)
      //show spinner for at least 2s even if post request is finished first 
      .then(response => {
        setTimeout(() => {
          dispatch(purchaseSuccess(response.data.name));
          window.location.replace("/");  //redirect and reload to homepage when done
        }, 2000);
      })
      .catch(error => {
        dispatch(purchaseFailure(error));
        window.location.replace("/");
      });
  };
}
export const purchaseStart2 = () => {
  return {
    type: actionTypes.PURCHASE_START
  };
}