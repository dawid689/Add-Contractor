import React from "react";
import classes from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={classes.layout}>
      <div className={classes.card}>{props.children}</div>
    </div>
  );
};

export default Card;
