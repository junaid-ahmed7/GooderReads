import React from "react";
import "../../stylesheets/Star.scss";


//COMPONENT TO RENDER EMPTY STARS FOR THE STAR RATING
const EmptyStar = (props) => {
  return (
    <React.Fragment>
      <span className="fa fa-star"></span>
    </React.Fragment>
  );
};

export default EmptyStar;