import React, {Component} from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  lettuce: 0.5,
  bacon: 1.5,
  cheese: 1.0,
  beef: 2.0
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      lettuce: 0,
      bacon: 0,
      cheese: 0,
      beef: 0
    }, 
    totalPrice: 3,
    canPurchase: false,
    isPurchasing: false  //order button was clicked
  }

  //doesn't need to be an arrow function since it's not assigned to an event
  updatePurchaseState(ingreds) {
    let bool;
    let sum = 0;
    const ingredAmounts = Object.values(ingreds); //ex: [0,2,1,3]

    for(var i=0; i<ingredAmounts.length; i++) {
      sum = sum + ingredAmounts[i];
    }

    if(sum > 0)
      bool = true;
    else 
      bool = false;

    this.setState({canPurchase: bool});
  }

  addIngredientHandler = (type) => {
    const updatedCount = this.state.ingredients[type] + 1;

    //make a copy
    const updatedIngredients = {
      ...this.state.ingredients
    };

    //updates
    updatedIngredients[type] = updatedCount;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });

    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    //button does nothing when there are no ingredients to remove
    if(this.state.ingredients[type] <= 0)
      return;

    const updatedCount = this.state.ingredients[type] - 1;

    //make a copy
    const updatedIngredients = {
      ...this.state.ingredients
    };

    //updates
    updatedIngredients[type] = updatedCount;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });

    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({isPurchasing: true});
  }

  render() {
    /*
    const disabledCheck = {
      ...this.state.ingredients
    };
    for(var key in disabledCheck) {
      //this check will return T or F. 
      //T means there are no ingreds to remove and so bttn will be disabled.
      //ex: {lettuce: true, bacon: false, cheese:false, beef: true}
      disabledCheck[key] = (disabledCheck[key] <= 0);
    }
    */

    return (
      <Aux>
        <Modal showModal={this.state.isPurchasing}>
          <OrderSummary ingredients={this.state.ingredients}/>
        </Modal>
        
        <Burger ingredients={this.state.ingredients}/>
        
        <BuildControls 
          ingredientAdded={(t) => this.addIngredientHandler(t)}
          ingredientRemoved={this.removeIngredientHandler}
          //disabledBttnObj={disabledCheck}
          price={this.state.totalPrice}
          purchasable={this.state.canPurchase}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;