import axios from "axios";
import * as actionTypes from "./actionTypes";

const REGISTER_LINK = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=";
const LOGIN_LINK = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=";
const API_KEY = "AIzaSyBwALVFvTr1Sqm4mRdMRLlQ6Y2DJCkcrTc";

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  };
};

export const authFailure = (error) => {
  return {
    type: actionTypes.AUTH_FAILURE,
    error: error
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
        dispatch(authSuccess(response.data));
      })
      .catch(error => {
        dispatch(authFailure(error));
      });
  };
};
//sync code
export const authStart2 = () => {
  return {
    type: actionTypes.AUTH_START
  };
};