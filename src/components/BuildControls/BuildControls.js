import React from "react";
import styles from "./BuildControls.css";
import SingleControl from "./SingleControl/SingleControl";

//our possible control options
const controls = [
  {label: "Lettuce", type: "lettuce"},
  {label: "Bacon", type: "bacon"},
  {label: "Cheese", type: "cheese"},
  {label: "Beef", type: "beef"},
];

const buildControls = (props) => {
  return (
    <div className={styles.BuildControls}>
      <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>

      {controls.map(ctrl => (
        <SingleControl 
          key={ctrl.label} 
          myLabel={ctrl.label}
          added={() => props.ingredientAdded(ctrl.type)}
          removed={() => props.ingredientRemoved(ctrl.type)}
          disabledBttnVal={props.disabledBttnObj[ctrl.type]}
        />
      ))}

      {/*note: disabled is a HTML attribute, not a prop*/}
      <button 
        className={styles.OrderButton}
        disabled={!props.canPurchase}
        onClick={props.ordered}
        >{props.isAuthFromBB ? "ORDER NOW" : "LOGIN TO ORDER"}</button>
    </div>
  );
};

export default buildControls;