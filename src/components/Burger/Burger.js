import React from "react";
import styles from "./Burger.css";
import Ingredient from "./Ingredient/Ingredient";

const burger = (props) => {
  return (
    //burger is a div on the screen
    <div className={styles.Burger}>
      <Ingredient type="bun-top" />
      <Ingredient type="cheese" />
      <Ingredient type="meat" />
      <Ingredient type="bun-bottom" />
    </div>
  );
};

export default burger;