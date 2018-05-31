import React from "react";
import styles from "./NavItems.css";
import {NavLink} from "react-router-dom";

const navItems = () => {
  return (
    <ul className={styles.NavItems}>
      <li className={styles.Item}>
        <NavLink
          to="/"
          exact
          activeClassName={styles.active}  //Wouldn't need to do this if not using CSS Modules
          >Burger Builder</NavLink>
      </li>
      <li className={styles.Item}>
        <NavLink 
          to="/my-orders"
          activeClassName={styles.active}
          >My Orders</NavLink>
      </li>
    </ul>
  );
}

export default navItems;