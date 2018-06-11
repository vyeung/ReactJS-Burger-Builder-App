import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  isLoading: false
};

const contactDataReducer = (state=initialState, action) => {
  if(action.type === actionTypes.PURCHASE_START) {
    return {
      ...state,
      isLoading: true
    };
  }
  
  else if(action.type === actionTypes.PURCHASE_SUCCESS) {
    const mergeIdAndData = {
      ...action.orderData,
      id: action.orderId
    };
    return {
      ...state,
      orders: state.orders.concat(mergeIdAndData),
      isLoading: false
    };
  }

  else if(action.type === actionTypes.PURCHASE_FAILURE) {
    return {
      isLoading: false
    };
  }

  return state;
}

export default contactDataReducer;