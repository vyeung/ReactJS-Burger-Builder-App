import axios from "axios";
import * as actionTypes from "./actionTypes";

const REGISTER_LINK = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=";
const LOGIN_LINK = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=";
const API_KEY = "AIzaSyBwALVFvTr1Sqm4mRdMRLlQ6Y2DJCkcrTc";

export const authSuccess = (token, localId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: localId
  };
};

export const authFailure = (errorObj) => {
  return {
    type: actionTypes.AUTH_FAILURE,
    errorObj: errorObj
  };
};

//async code
export const authStart = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart2());

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    let FULL_LINK;
    if(isSignUp === true) {
      FULL_LINK = REGISTER_LINK + API_KEY;
    }
    else {
      FULL_LINK = LOGIN_LINK + API_KEY;
    }

    axios.post(FULL_LINK, authData)
      .then(response => {
        console.log(response);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));  //3600s = 1hr
      })
      .catch(err => {
        console.log(err.response);
        //dispatch entire data.error object
        dispatch(authFailure(err.response.data.error));
      });
  };
};
//sync code
export const authStart2 = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime*1000); //since setTimeout is in ms
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};