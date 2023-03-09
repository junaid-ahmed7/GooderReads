import React from "react";
import EmptyStar from "./EmptyStar";
import Star from "./Star";
import "../../stylesheets/Book.scss";

//COMPONENT FOR EACH BOOK THAT IS UNREAD
const UnreadBook = (props) => {
  //LOGIC TO RENDER STARS NEXT TO THE RATING
  const avgStarRating = Math.floor(props.avgRating);
  const avgStars = [];
  for (let i = 0; i < 5; i++) {
    if (i < avgStarRating) {
      avgStars.push(<Star key={i} />);
    } else {
      avgStars.push(<EmptyStar key={i} />);
    }
  }
  return (
    <React.Fragment>
      <div>
        <ul className="my__list">
          <li className="title">Title: {props.title}</li>
          <li>By: {props.author}</li>
          <li>
            Average Rating: {props.avgRating} {avgStars}
          </li>
          <li># of Pages: {props.pageCount}</li>
          <li>Year of Publication: {props.yearOfPub}</li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default UnreadBook;
