import React from "react";
import Star from "./Star";
import EmptyStar from "./EmptyStar";
import "../../stylesheets/Book.scss";

//COMPONENT TO CREATE BOOK ITEMS FOR EACH BOOK THAT HAS BEEN READ
const Book = (props) => {
  //LOGIC FOR CREATE AND RENDER THE STARS NEXT TO THE RATINGS
  const starRating = Math.floor(props.rating);
  const avgStarRating = Math.floor(props.avgRating);
  const usersStars = [];
  const avgStars = [];
  for (let i = 0; i < 5; i++) {
    if (i < starRating) {
      usersStars.push(<Star key={i} />);
    } else {
      usersStars.push(<EmptyStar key={i} />);
    }
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
            Your Rating: {props.rating} {usersStars}
          </li>
          <li># of Pages: {props.pageCount}</li>
          <li>
            Average Rating: {props.avgRating} {avgStars}
          </li>
          <li>Year of Publication: {props.yearOfPub}</li>
          <li>Date Read: {props.dateRead}</li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Book;
