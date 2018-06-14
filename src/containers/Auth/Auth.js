import React, {Component} from "react";
import {connect} from "react-redux";
import styles from "./Auth.css";
import * as authActions from "../../store/actions/auth-A";

class Auth extends Component {
  state = {
    authForm: {
      email: "",
      password: ""
    },
    isSignUp: true  //assume always start in signup mode
  }
  
  inputEnteredHandler = (event) => {
    console.log(event.target.validity);

    if(event.target.name === "password") {
      if(event.target.validity.tooShort === true) {
        event.target.setCustomValidity("Password must be 6 or more characters");
      }
      else {
        event.target.setCustomValidity("");
      }
    }

    const updatedForm = {...this.state.authForm};        //make copy
    updatedForm[event.target.name] = event.target.value; //do update
    this.setState({authForm: updatedForm});
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.authForm.email, this.state.authForm.password, this.state.isSignUp);
  }

  switchAuthModeHandler = () => {
    this.setState({isSignUp: false});
  }

  render() {
    let authMessage;
    if(this.props.globalError) {
      //extract message field from globalError object
      authMessage = <p className={styles.errMsg}>{this.props.globalError.message}</p>;
    }
    //having a userId means login was successful
    else if(this.props.globalUserId) {
      authMessage = <p className={styles.welcomeMsg}>WELCOME!</p>;
    }
    else {
      authMessage = null;
    }

    return (
      <div className={styles.AuthData}>
        {authMessage}

        <form onSubmit={this.submitHandler}>
          <input 
            className={styles.Input}
            type="email"
            name="email"
            placeholder="Your Email..."
            required
            onChange={this.inputEnteredHandler} />
          <input 
            className={styles.Input}
            type="text"
            name="password"
            placeholder="Your Password..."
            required
            minLength={6}
            onChange={this.inputEnteredHandler} />
            
          <button
            className={[styles.Button, styles.Login].join(" ")}
            onClick={this.switchAuthModeHandler}
            >Login</button>
          or
          <button
            className={[styles.Button, styles.Register].join(" ")}
            >Register</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    globalError: state.toAuthReducer.error,
    globalUserId: state.toAuthReducer.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(authActions.authStart(email, password, isSignUp))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);