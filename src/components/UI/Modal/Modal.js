import React from "react";
import styles from "./Modal.css";

const modal = (props) => {
  //showing the modal conditionally
  const modalAnimation = {
    //have it slide onto screen or have it off screen
    transform: props.showModal ? "translateY(0)" : "translateY(-100vh)",
    //have it completely visible or invisible
    opacity: props.showModal ? "1" : "0"
  };

  return (
    <div className={styles.Modal} style={modalAnimation}>
      {props.children}
    </div>
  );
}

export default modal;