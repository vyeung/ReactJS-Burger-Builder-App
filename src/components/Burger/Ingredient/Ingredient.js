import React from "react";
import PropTypes from "prop-types";
import styles from "./Ingredient.css";

const ingredient = (props) => {
  let ingredient = null;

  if(props.type === "bun-bottom") {
    ingredient = <div className={styles.BunBottom}></div>;
  }
  else if(props.type === "bun-top") {
    ingredient = (
      <div className={styles.BunTop}>
        <div className={styles.Seeds1}></div>
        <div className={styles.Seeds2}></div>
      </div>
    );
  }
  else if(props.type === "beef") {
    ingredient = <div className={styles.Meat}></div>;
  }
  else if(props.type === "cheese") {
    ingredient = <div className={styles.Cheese}></div>;
  }
  else if(props.type === "lettuce") {
    ingredient = <div className={styles.Lettuce}></div>;
  }
  else if(props.type === "bacon") {
    ingredient = <div className={styles.Bacon}></div>;
  }

  return ingredient;
}

ingredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default ingredient;