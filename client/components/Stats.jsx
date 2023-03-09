import React from "react";
import { useLocation } from "react-router-dom";

const Stats = () => {
  const location = useLocation();
  const books = location.state;
  let yourAvgRating = 0;
  let booksAvgRating = 0;
  let avgPageLength = 0;
  let shortestBook;
  let shortestAuth;
  let shortestBookPages = Infinity;
  let longestBook;
  let longestAuth;
  let longestBookLength = -Infinity;
  for (let i = 0; i < books.length; i++) {
    const yourRating = Number(books[i].rating);
    const pageLength = Number(books[i].pageCount);
    yourAvgRating += yourRating;
    booksAvgRating += Number(books[i].avgRating);
    avgPageLength += pageLength;

    if (pageLength < shortestBookPages) {
      shortestBookPages = pageLength;
      shortestAuth = books[i].author;
      shortestBook = books[i].title;
    }
    if (pageLength > longestBookLength) {
      longestBookLength = pageLength;
      longestAuth = books[i].author;
      longestBook = books[i].title;
    }
  }
  yourAvgRating = yourAvgRating / books.length;
  booksAvgRating = (booksAvgRating / books.length).toFixed(2);
  avgPageLength = Math.floor(avgPageLength / books.length);
  return (
    <React.Fragment>
      <h1>in stats</h1>
      <p>your avg rating is {yourAvgRating}</p>
      <p>you read avg rating {booksAvgRating}</p>
      <p>your avg page count is {avgPageLength}</p>
      <p>
        the shorted u read is {shortestBook} its {shortestBookPages} by{" "}
        {shortestAuth}
      </p>
      <p>
        the longest u read is {longestBook} its {longestBookLength} by{" "}
        {longestAuth}
      </p>
    </React.Fragment>
  );
};

export default Stats;
