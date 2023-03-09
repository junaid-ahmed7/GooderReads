import React from "react";
import "../../../stylesheets/Star.scss";

//COMPONENT TO RENDER STARS FOR THE STAR RATING
const Star = (props) => {
  return (
    <React.Fragment>
      <span className="fa fa-star checked"></span>
    </React.Fragment>
  );
};

export default Star;
