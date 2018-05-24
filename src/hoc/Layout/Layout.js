import React, { Component } from "react";
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
        <Toolbar clickToggle={this.sidedrawerToggleHander} />
        
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