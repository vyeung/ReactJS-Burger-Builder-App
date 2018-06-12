import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orderId: "",
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
    return {
      ...state,
      orderId: action.orderId,
      isLoading: false
    };
  }
  else if(action.type === actionTypes.PURCHASE_FAILURE) {
    return {
      ...state,
      isLoading: false
    };
  }

  return state;
}

export default contactDataReducer;