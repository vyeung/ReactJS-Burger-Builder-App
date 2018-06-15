import React from "react";
import styles from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavItems from "../NavItems/NavItems";

const toolbar = (props) => {
  //toolbar is basically a giant header
  return (
    <header className={styles.Toolbar}>
      <div className={styles.DrawerToggle} onClick={props.clickToggle}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      
      {/*wrap Logo with a div to change its height from 100%->80% of Toolbar*/}
      <div className={styles.ChangeLogoHeight}>
        <Logo />
      </div>
      
      <nav className={styles.HideDesktopNavItems}>
        <NavItems isAuthenticated={props.isAuthFromLayout} />
      </nav>
    </header>
  );
}

export default toolbar;