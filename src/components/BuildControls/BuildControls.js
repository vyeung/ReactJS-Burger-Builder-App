import React from "react";
import styles from "./BuildControls.css";
import SingleControl from "./SingleControl/SingleControl";

//our possible control options
const controls = [
  {label: "Lettuce", type: "salad"},
  {label: "Bacon", type: "bacon"},
  {label: "Cheese", type: "cheese"},
  {label: "Beef", type: "meat"},
];

const buildControls = (props) => {
  return (
    <div className={styles.BuildControls}>
      {/*pass each SingleControl 1 prop using map*/}
      {controls.map(ctrl => (
        <SingleControl key={ctrl.label} myLabel={ctrl.label}/>
      ))}
    </div>
  );
};

export default buildControls;