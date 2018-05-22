import React from "react";
import Aux from "../../../hoc/Auxiliary";
import styles from "./OrderSummary.css";

const orderSummary = (props) => {
  const ingredientSummary = [];
  
  const capitalize = {
    textTransform: "capitalize"
  };

  for(var key in props.ingredients) {
    ingredientSummary.push(
      <li key={key}>
        <span style={capitalize}>{key}</span>: {props.ingredients[key]}
      </li>
    );
  }

  /*
  example of possible elements in ingredientSummary
    <li>Lettuce: 0</li>
    <li>Bacon: 1</li>
    <li>Cheese: 2</li>
    <li>Beef: 2</li>
  */

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>Chosen Burger Ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Continue to Checkout?</p>
      
      <button
        //same as className={"Button Cancel"}
        className={[styles.Button, styles.Cancel].join(" ")}
        onClick={props.purchaseCancelled}
        >CANCEL</button>
      
      <button
        className={[styles.Button, styles.Continue].join(" ")}
        onClick={props.purchaseContinued}
        >CONTINUE</button>
    </Aux>
  );
}

export default orderSummary;