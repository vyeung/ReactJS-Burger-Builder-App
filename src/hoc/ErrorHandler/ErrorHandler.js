import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxiliary/Auxiliary";

//purpose is to wrap any component that we want to handle errors with (using axios)
const errorHandler = (WrappedComponent, axios) => 
{
  //anonymous class with no name
  return class extends Component {
    state = {
      error: null
    }
    
    componentDidMount() {
      //clear/dismiss error when we send a request
      axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      });
      
      //only triggers if we get an error. 
      //the produced errorMsg will come from firebase (used in line 37).
      axios.interceptors.response.use(res => {return res}, errorMsg => {
        this.setState({error: errorMsg});
      });
    }

    //also clear/dismiss error when user clicks the backdrop
    errorClearedHandler = () => {
      this.setState({error: null});
    }
    
    render() {
      return (
        <Aux>
          <Modal showModal={this.state.error} closeModal={this.errorClearedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>

          {/*keep the props that are associated with wrapped component*/}
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  }
}

export default errorHandler;