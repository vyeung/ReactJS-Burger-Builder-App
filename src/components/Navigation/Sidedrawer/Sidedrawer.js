import React from "react";
import styles from "./Sidedrawer.css";
import Logo from "../../Logo/Logo";
import NavItems from "../NavItems/NavItems";

//the Sidedrawer is the navigation for users on mobile devices.
const sidedrawer = (props) => {
  return (
    <div className={styles.Sidedrawer}>
      <Logo />

      <nav>
        <NavItems />
      </nav>
    </div>
  );
};

export default sidedrawer;