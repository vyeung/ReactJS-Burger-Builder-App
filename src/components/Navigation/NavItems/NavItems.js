import React from "react";
import styles from "./NavItems.css";
import {NavLink} from "react-router-dom";

const navItems = (props) => {
  return (
    <ul className={styles.NavItems}>
      <li className={styles.Item}>
        <NavLink
          to="/"
          exact
          activeClassName={styles.active}  //Wouldn't need to do this if not using CSS Modules
          >Burger Builder</NavLink>
      </li>

      {/*only logged in users can see orders page*/}
      <li className={styles.Item}>
        {props.isAuthenticated===true ? 
          <NavLink 
            to="/my-orders"
            activeClassName={styles.active}
            >My Orders</NavLink>
          : null
        }
      </li>

      {/* inline using ternary operator */}
      <li className={styles.Item}>
        {props.isAuthenticated===false ?
          <NavLink 
            to="/auth" 
            activeClassName={styles.active}
            >Authenticate</NavLink> 
          : <NavLink 
              to="/logout"
              activeClassName={styles.active}
              >Logout</NavLink>    
        }
      </li>
    </ul>
  );
}

export default navItems;