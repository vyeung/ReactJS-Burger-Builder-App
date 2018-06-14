import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  isLoading: false
};

const authReducer = (state=initialState, action) => {
  if(action.type === actionTypes.AUTH_START) {
    return {
      ...state,
      error: null,
      isLoading: true
    };
  }
  else if(action.type === actionTypes.AUTH_SUCCESS) {
    return {
      ...state,
      token: action.idToken,
      userId: action.userId,
      error: null,
      isLoading: false  //since done
    };
  }
  else if(action.type === actionTypes.AUTH_FAILURE) {
    return {
      ...state,
      error: action.errorObj,
      isLoading: false
    };
  }

  return state;
}

export default authReducer;