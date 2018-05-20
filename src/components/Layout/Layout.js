import React from "react";
import Aux from "../../hoc/Auxiliary";
import styles from "./Layout.css";

const layout = (props) => {
  return (
    //using a HOC to save rendering an unnecessary div
    <Aux>
      <div>Toolbar, SideDrawer, Backdrop</div>
      <main className={styles.Content}>
        {props.children}
      </main>
    </Aux>
  );
};

export default layout;