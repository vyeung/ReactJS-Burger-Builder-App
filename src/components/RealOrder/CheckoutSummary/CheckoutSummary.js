import React from "react";
import styles from "./CheckoutSummary.css";
import Burger from "../../Burger/Burger";

const checkoutSummary = (props) => {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>Final Preview</h1>
      
      <div className={styles.BurgerPreview}>
        <Burger ingredients={props.checkoutIngreds} />
      </div>

      <button
        className={[styles.Button, styles.Cancel].join(" ")}
        onClick={props.checkoutCancelled}
        >CANCEL</button>
      
      <button
        className={[styles.Button, styles.Continue].join(" ")}
        onClick={props.checkoutContinued}
        >CONTINUE</button>
    </div>
  );
}

export default checkoutSummary;