import React from "react";
import Aux from "../../hoc/Auxiliary";

const layout = (props) => {
  return (
    //using a HOC so we can have adjacent JSX elements
    <Aux>
      <div>Toolbar, SideDrawer, Backdrop</div>
      <main>
        {props.children}
      </main>
    </Aux>
  );
};

export default layout;