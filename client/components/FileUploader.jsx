import React, { useState } from "react";
const csvParse = require("papaparse");

const FileUploader = (props) => {
  const [readBooks, setReadBooks] = useState([]);
  const [unreadBooks, setUnreadBooks] = useState([]);
  const readBooksArr = [];
  const unreadBooksArr = [];
  const fileUploaded = (e) => {
    const file = document.getElementById("fileItem").files[0];
    csvParse.parse(file, {
      complete: (results, file) => {
        for (let i = 1; i < results.data.length - 1; i++) {
          const currBook = results.data[i];
          if (currBook[14]) {
            const bookObj = {
              title: currBook[1],
              author: currBook[2],
              ISBN: currBook[5],
              rating: currBook[7],
              avgRating: currBook[8],
              pageCount: currBook[11],
              yearOfPub: currBook[12],
              dateRead: currBook[14],
            };
            if (currBook[5].length < 5) {
              bookObj.ISBN = ` =ISBN UNAVAILABLE, ${i}`;
            }
            readBooksArr.push(bookObj);
          }
          if (!currBook[14]) {
            const bookObj = {
              title: currBook[1],
              author: currBook[2],
              ISBN: currBook[5],
              avgRating: currBook[8],
              pageCount: currBook[11],
              yearOfPub: currBook[12],
            };
            if (currBook[5].length < 5) {
              bookObj.ISBN = ` =ISBN UNAVAILABLE, ${i}`;
            }
            unreadBooksArr.push(bookObj);
          }
        }
        fetch("/books", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify([readBooksArr, unreadBooksArr, props]),
        });
        setUnreadBooks(unreadBooksArr);
        setReadBooks(readBooksArr);
      },
    });
  };
  return (
    <React.Fragment>
      <input id="fileItem" type="file" onChange={fileUploaded} />
      {readBooks.map((book) => {
        return (
          <ul key={book.ISBN}>
            <li>Title: {book.title}</li>
            <li>Author: {book.author}</li>
            <li>Your Rating: {book.rating}</li>
            <li>Average Rating: {book.avgRating}</li>
            <li># of Pages: {book.pageCount}</li>
            <li>Year of Publication: {book.yearOfPub}</li>
            <li>Date Read: {book.dateRead}</li>
          </ul>
        );
      })}
      {unreadBooks.map((book) => {
        return (
          <ul key={book.ISBN}>
            <li>Title: {book.title}</li>
            <li>Author: {book.author}</li>
            <li>Average Rating: {book.avgRating}</li>
            <li># of Pages: {book.pageCount}</li>
            <li>Year of Publication: {book.yearOfPub}</li>
          </ul>
        );
      })}
    </React.Fragment>
  );
};

export default FileUploader;
