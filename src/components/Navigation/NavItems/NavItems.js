import React from "react";
import styles from "./NavItems.css";

const navItems = () => {
  return (
    <ul className={styles.NavItems}>
      <li className={styles.Item}>
        <a 
          href="/"
          //className={props.active ? styles.active : null}
          className={styles.active}
          >Burger Builder</a>
      </li>
      <li className={styles.Item}>
        <a 
          href="/"
          //className={props.active ? styles.active : null}
          >Checkout</a>
      </li>
    </ul>
  );
}

export default navItems;