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
      {/*pass each SingleControl 2 props using map*/}
      {controls.map(ctrl => (
        <SingleControl 
          key={ctrl.label} 
          myLabel={ctrl.label}
          added={() => props.ingredientAdded(ctrl.type)}
        />
      ))}
    </div>
  );
};

export default buildControls;