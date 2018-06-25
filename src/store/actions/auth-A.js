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
        
        //creates a new Date object with 1 extra hour added to it
        const tokenExpireDate = new Date(new Date().getTime() + response.data.expiresIn*1000);

        //saving auth credentials in localStorage prevents them being lost on page reload
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("tokenExpireDate", tokenExpireDate);
        localStorage.setItem("userId", response.data.localId);

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
    }, expirationTime*1000);  //since setTimeout works in ms
  };
};

export const logout = () => {
  //clear token info in localStorage on logout
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpireDate");
  localStorage.removeItem("userId");  
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthState = () => {
  return dispatch => {
    const tokenInStorage = localStorage.getItem("token");
    const userIdStorage = localStorage.getItem("userId");
    const tokenExpireDate = new Date(localStorage.getItem("tokenExpireDate"));
    const exactCurrentDate = new Date();

    if(!tokenInStorage) {
      dispatch(logout());
    }
    else {
      //do auto login if token hasn't expired yet
      if(tokenExpireDate >= exactCurrentDate) {
        const timeLeftInSecs = (tokenExpireDate.getTime() - exactCurrentDate.getTime()) / 1000;
        console.log(timeLeftInSecs + "s");
        dispatch(authSuccess(tokenInStorage, userIdStorage));
        dispatch(checkAuthTimeout(timeLeftInSecs));
      }
      else {
        dispatch(logout());
      }
    }
  };
};