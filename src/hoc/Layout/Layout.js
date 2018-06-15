import React, { Component } from "react";
import {connect} from "react-redux";
import Aux from "../Auxiliary/Auxiliary";
import styles from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Sidedrawer from "../../components/Navigation/Sidedrawer/Sidedrawer";

class Layout extends Component {
  state = {
    showSidedrawer: false
  }
  
  sidedrawerClosedHandler = () => {
    this.setState({showSidedrawer: false});
  }

  sidedrawerToggleHander = () => {
    //avoiding putting this.state inside setState
    this.setState((prevState) => {
      return {showSidedrawer: !prevState.showSidedrawer}
    });
  }
  
  render() {
    return (
      //using a HOC to save rendering an unnecessary div
      <Aux>
        <Toolbar 
          clickToggle={this.sidedrawerToggleHander}
          isAuthFromLayout={this.props.globalIsAuth} />
        
        <Sidedrawer 
          showSD={this.state.showSidedrawer}
          closeSD={this.sidedrawerClosedHandler}
          isAuthFromLayout={this.props.globalIsAuth} />

        <main className={styles.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
} 

const mapStateToProps = (state) => {
  return {
    globalIsAuth: state.toAuthReducer.token !== null  //T or F
  };
}

export default connect(mapStateToProps)(Layout);