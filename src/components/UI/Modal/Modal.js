import React from "react";
import styles from "./Modal.css";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

const modal = (props) => {
  //showing the modal conditionally:
  //  if true, have it slide onto screen and visible.
  //  if false, have it off screen and invisible.
  const modalAnimation = {
    transform: props.showModal ? "translateY(0)" : "translateY(-100vh)",
    opacity: props.showModal ? "1" : "0"
  };

  return (
    //want the modal and backdrop to be shown together, so we'll use our Aux
    <Aux>
      <Backdrop 
        showBackdrop={props.showModal}
        clicked={props.closeModal}
      />

      <div className={styles.Modal} style={modalAnimation}>
        {/*children here is the OrderSummary*/}
        {props.children}
      </div>
    </Aux>
  );
}

export default modal;