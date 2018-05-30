import React from "react";
import styles from "./CheckoutSummary.css";
import Burger from "../../Burger/Burger";

const checkoutSummary = (props) => {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>Enjoy!</h1>
      
      <div className={styles.BurgerPreview}>
        <Burger ingredients={props.checkoutIngreds} />
      </div>

      <button
        className={[styles.Button, styles.Cancel].join(" ")}
        onClick={props.purchaseCancelled}
        >CANCEL</button>
      
      <button
        className={[styles.Button, styles.Continue].join(" ")}
        onClick={props.purchaseContinued}
        >CONTINUE</button>
    </div>
  );
}

export default checkoutSummary;