import React from "react";
import styles from "./Toolbar.css";
import Logo from "../../Logo/Logo";

const toolbar = (props) => {
  //toolbar is basically a giant header
  return (
    <header className={styles.Toolbar}>
      <div>MENU</div>
      <Logo />
      <nav>
        ...
      </nav>
    </header>
  );
}

export default toolbar;