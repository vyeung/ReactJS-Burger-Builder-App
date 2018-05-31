import React from "react";
import styles from "./RealOrder.css";

const realOrder = (props) => {
  let realOrderIngreds = [];

  for(var key in props.ingreds) {
    realOrderIngreds.push(
      <span key={key} className={styles.Span}>
        {key} ({props.ingreds[key]})
      </span>
    );
  }

  return (
    <div className={styles.RealOrder}>
      <p>Ingredients: {realOrderIngreds}</p>
      <p>Price: <strong>${props.price}</strong></p>
    </div>
  );
}

export default realOrder;