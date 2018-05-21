import React, {Component} from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
  lettuce: 0.5,
  bacon: 1.0,
  cheese: 0.5,
  beef: 1.5
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      lettuce: 0,
      bacon: 0,
      cheese: 0,
      beef: 0
    }, 
    totalPrice: 4
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
  }

  removeIngredientHandler = (type) => {

  }

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        
        <BuildControls 
          ingredientAdded={(t) => this.addIngredientHandler(t)}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;