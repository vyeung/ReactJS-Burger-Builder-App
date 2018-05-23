import React from "react";
import Aux from "../../hoc/Auxiliary";
import styles from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import Sidedrawer from "../Navigation/Sidedrawer/Sidedrawer";

const layout = (props) => {
  return (
    //using a HOC to save rendering an unnecessary div
    <Aux>
      <Toolbar />
      <Sidedrawer />

      <main className={styles.Content}>
        {props.children}
      </main>
    </Aux>
  );
};

export default layout;