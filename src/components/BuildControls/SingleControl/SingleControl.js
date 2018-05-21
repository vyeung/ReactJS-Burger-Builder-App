import React from "react";
import styles from "./SingleControl.css";

const singleControl = (props) => {
  //1 singleControl has 1 label and 2 buttons
  return (
    <div className={styles.SingleControl}>
      <div className={styles.Label}>
        {props.myLabel}
      </div> 

      <button className={styles.Less}> - </button>
      <button className={styles.More} onClick={props.added}> + </button>
    </div>
  );
};

export default singleControl;