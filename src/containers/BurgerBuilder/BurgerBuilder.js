import React, {Component} from "react";
import {connect} from "react-redux";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import errorHandler from "../../hoc//ErrorHandler/ErrorHandler";
import * as burgerBuilderActions from "../../store/actions/burgerBuilder-A";

class BurgerBuilder extends Component {
  state = {
    isPurchasing: false,
    //ingredLoadError: false
  }

  //get initialized ingredients data from the firebase database
  // componentDidMount() {
  //   axios.get("/ingredients.json")
  //     .then(response => {
  //       this.setState({ingredients: response.data});
  //     })
  //     .catch(error => {
  //       this.setState({ingredLoadError: true});
  //     });
  // }

  //doesn't need to be an arrow function since it's not assigned to an event
  updatePurchaseState(ingreds) {
    let bool, sum=0;
    const ingredAmounts = Object.values(ingreds); //ex: [0,2,1,3]

    for(var i=0; i<ingredAmounts.length; i++) {
      sum = sum + ingredAmounts[i];
    }

    if(sum > 0)
      bool = true;
    else 
      bool = false;

    return bool;
  }

  //start purchasing process when order button is clicked
  purchaseHandler = () => {
    this.setState({isPurchasing: true});
  }

  //on clicking backdrop or close button, close the modal thus cancelling order
  purchaseCancelHandler = () => {
    this.setState({isPurchasing: false});
  }

  //on clicking continue button
  purchaseContinueHandler = () => {
    //go to checkout page and pass our entire state object to it (not needed anymore but good for reference)
    this.props.history.push("/checkout", this.state);
  }

  render() {
    const disabledCheck = {...this.props.globalIngreds};

    for(var key in disabledCheck) {
      //RHS returns T or F. 
      //T means there are no ingreds to remove and so bttn will be disabled.
      //ex: {lettuce: true, bacon: false, cheese:false, beef: true}
      disabledCheck[key] = (disabledCheck[key] <= 0);
    }

    /*let burger;
    if(this.state.ingredLoadError === true) {
      burger = <p style={{textAlign:"center"}}>Can't Load Ingredients!</p>
    }
    else {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls 
            ingredientAdded={(t) => this.addIngredientHandler(t)}
            ingredientRemoved={this.removeIngredientHandler}
            disabledBttnObj={disabledCheck}
            price={this.state.totalPrice}
            purchasable={this.state.canPurchase}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
    }*/

    return (
      <Aux>
        {/*performance check that renders Modal and OrderSummary only when order button is clicked */}
        {this.state.isPurchasing &&
          <Modal showModal={this.state.isPurchasing} closeModal={this.purchaseCancelHandler}>
            <OrderSummary 
              ingredients={this.props.globalIngreds}
              price={this.props.globalTotalPrice}
              purchaseCancelled={this.purchaseCancelHandler}
              purchaseContinued={this.purchaseContinueHandler} 
            />
          </Modal>
        }
        
        <Burger ingredients={this.props.globalIngreds}/>

        <BuildControls 
          ingredientAdded={(t) => this.props.onIngredientAdded(t)}
          ingredientRemoved={this.props.onIngredientRemoved}
          disabledBttnObj={disabledCheck}
          price={this.props.globalTotalPrice}
          canPurchase={this.updatePurchaseState(this.props.globalIngreds)}
          ordered={this.purchaseHandler}
        /> 

        {/*{burger}*/}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    globalIngreds: state.toBurgerBuilderReducer.ingredients,
    globalTotalPrice: state.toBurgerBuilderReducer.totalPrice
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (name) => dispatch(burgerBuilderActions.addIngredient(name)),
    onIngredientRemoved: (name) => dispatch(burgerBuilderActions.removeIngredient(name))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(BurgerBuilder, axios));