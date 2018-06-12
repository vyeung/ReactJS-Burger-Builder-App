import * as actionTypes from "../actions/actionTypes";

const initialState = {
  myOrders: []
};

const contactDataReducer = (state=initialState, action) => {
  if(action.type === actionTypes.FETCH_ORDERS_START) {
    //could just say return state;
    return {
      ...state
    };
  }
  else if(action.type === actionTypes.FETCH_ORDERS_SUCCESS) {
    return {
      ...state,
      myOrders: action.orders
    };
  }
  else if(action.type === actionTypes.FETCH_ORDERS_FAILURE) {
    return {
      ...state
    };
  }

  return state;
}

export default contactDataReducer;