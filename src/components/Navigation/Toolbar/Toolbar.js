import React from "react";
import styles from "./Toolbar.css";

const toolbar = (props) => {
  //toolbar is basically a giant header
  return (
    <header className={styles.Toolbar}>
      <div>MENU</div>
      <div>LOGO</div>
      <nav>
        ...
      </nav>
    </header>
  );
}

export default toolbar;