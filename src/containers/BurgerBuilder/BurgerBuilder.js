import React, {Component} from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import errorHandler from "../../hoc//ErrorHandler/ErrorHandler";

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

  //start purchasing process when order button is clicked
  purchaseHandler = () => {
    this.setState({isPurchasing: true});
  }

  //on clicking backdrop or close button, close the modal thus cancelling order
  purchaseCancelHandler = () => {
    this.setState({isPurchasing: false});
  }

  //on clicking continue button
  purchaseContinueHandler = () => 
  {
    //go to checkout page and pass our entire state object to it
    this.props.history.push("/checkout", this.state);
  }

  render() {
    const disabledCheck = {
      ...this.state.ingredients
    };
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
    }
    */

    return (
      <Aux>
        {/*performance check that renders Modal and OrderSummary only when order button is clicked */}
        {this.state.isPurchasing &&
          <Modal showModal={this.state.isPurchasing} closeModal={this.purchaseCancelHandler}>
            <OrderSummary 
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              purchaseCancelled={this.purchaseCancelHandler}
              purchaseContinued={this.purchaseContinueHandler} 
            />
          </Modal>
        }
        
        <Burger ingredients={this.state.ingredients}/>
        
        <BuildControls 
          ingredientAdded={(t) => this.addIngredientHandler(t)}
          ingredientRemoved={this.removeIngredientHandler}
          disabledBttnObj={disabledCheck}
          price={this.state.totalPrice}
          purchasable={this.state.canPurchase}
          ordered={this.purchaseHandler}
        /> 

        {/*{burger}*/}
      </Aux>
    );
  }
}

export default errorHandler(BurgerBuilder, axios);