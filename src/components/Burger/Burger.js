import React from "react";
import styles from "./Burger.css";
import Ingredient from "./Ingredient/Ingredient";

const burger = (props) => {
  var ingredientsArray = [];

  for(var key in props.ingredients) {
    //console.log(key);
    //console.log(props.ingredients[key]);
    for(var i=0; i<props.ingredients[key]; i++) {
      //need to give a key for each element in array. get a warning otherwise
      //ex: lettuce0, meat0, meat1
      ingredientsArray.push(<Ingredient key={key+i} type={key} />);
    }
  }

  if(ingredientsArray.length === 0) {
    ingredientsArray = <p>Please Start Adding Ingredients</p>;
  }

  return (
    //burger is a div on screen. 
    //will always have a top and bottom bun. put ingredientsArray in between 
    <div className={styles.Burger}>
      <Ingredient type="bun-top" />
      {ingredientsArray}
      <Ingredient type="bun-bottom" />
    </div>
  );
};

export default burger;