import React from "react";

//COMPONENT FOR EACH BOOK THAT IS UNREAD
const UnreadBook = (props) => {
  return (
    <React.Fragment>
      <div>
        <ul>
          <li>Title: {props.title}</li>
          <li>Author: {props.author}</li>
          <li>Average Rating: {props.avgRating}</li>
          <li># of Pages: {props.pageCount}</li>
          <li>Year of Publication: {props.yearOfPub}</li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default UnreadBook;
