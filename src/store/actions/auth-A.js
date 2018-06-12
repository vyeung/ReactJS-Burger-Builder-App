import * as actionTypes from "./actionTypes";

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAILURE,
    error: error
  };
};

//async code
export const authStart = (email, password) => {
  return dispatch => {
    dispatch(authStart2());
  };
};
//sync code
export const authStart2 = () => {
  return {
    type: actionTypes.AUTH_START
  };
};