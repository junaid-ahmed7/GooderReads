import React from "react";

//COMPONENT TO CREATE BOOK ITEMS FOR EACH BOOK THAT HAS BEEN READ
const Book = (props) => {
  return (
    <React.Fragment>
      <div>
        <ul>
          <li>Title: {props.title}</li>
          <li>Author: {props.author}</li>
          <li>Your Rating: {props.rating}</li>
          <li>Average Rating: {props.avgRating}</li>
          <li># of Pages: {props.pageCount}</li>
          <li>Year of Publication: {props.yearOfPub}</li>
          <li>Date Read: {props.dateRead}</li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Book;
