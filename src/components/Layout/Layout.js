import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import styles from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import Sidedrawer from "../Navigation/Sidedrawer/Sidedrawer";

class Layout extends Component {
  state = {
    showSidedrawer: true
  }
  
  sidedrawerClosedHandler = () => {
    this.setState({showSidedrawer: false});
  }
  
  render() {
    return (
      //using a HOC to save rendering an unnecessary div
      <Aux>
        <Toolbar />
        
        <Sidedrawer 
          showSD={this.state.showSidedrawer}
          closeSD={this.sidedrawerClosedHandler}
        />

        <main className={styles.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
} 

export default Layout;