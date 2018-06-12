import React from "react";
import styles from "./Sidedrawer.css";
import Logo from "../../Logo/Logo";
import NavItems from "../NavItems/NavItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

//the Sidedrawer is the navigation for users on mobile devices.
const sidedrawer = (props) => 
{
  //showing the Sidedrawer conditionally
  let attachedStyles = [styles.Sidedrawer, styles.Close];
  if(props.showSD === true) {
    attachedStyles = [styles.Sidedrawer, styles.Open];
  }
  
  //will be "Sidedrawer Close" or "Sidedrawer Open"
  attachedStyles = attachedStyles.join(" "); 

  return (
    <Aux>
      <Backdrop 
        showBackdrop={props.showSD}
        clicked={props.closeSD}
      />

      <div className={attachedStyles}>
        {/*wrap Logo with a div to change its height from 100%->11% of Sidedrawer*/}
        <div className={styles.ChangeLogoHeight}>
          <Logo />
        </div>
        <nav onClick={props.closeSD}>
          <NavItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sidedrawer;