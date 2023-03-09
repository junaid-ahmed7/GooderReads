import React, { useState } from "react";
const csvParse = require("papaparse");
import "../../stylesheets/FileUploader.scss";

const FileUploader = (props) => {
  //LOGIC FOR MAKING API CALLS TO GOOGLE BOOKS, RAN OUT OF QUOTA SO COULDNT IMPLEMENT :(
  //   const url = "https://www.googleapis.com/books/v1/volumes?q=";
  //   const auth = "+inauthor:";
  //   const APIKEY = "&key=AIzaSyBQz3PWiOeznmLhXa2fRNciUrwPJpYbea0";
  const readBooksArr = [];
  const unreadBooksArr = [];

  //THIS IS THE MAIN FUNCTION THAT USES PAPAPARSE TO PARSE THROUGH OUR UPLOADED CSV FILE. ON COMPLETION OF THE PARSE, IT LOOPS THROUGH THE RESULTS AND CREATES OBJECTS FOR EACH INDIVIDUAL BOOK AFTER LOOKING AT THE DATA, AND PUSHES ALL OF THAT INTO TWO ARRAYS, ONE FOR READ BOOKS AND ONE FOR UNREAD.
  const fileUploaded = (e) => {
    const file = document.getElementById("fileItem").files[0];
    csvParse.parse(file, {
      complete: (results, file) => {
        for (let i = 1; i < results.data.length - 1; i++) {
          const currBook = results.data[i];

          //LOGIC FOR API CALLS
          //   const authFName = currBook[2].split(" ")[0];
          //   const titleSplit = currBook[1].split(" ")[0];
          //   let imagesrc =
          //   "https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg";
          //   fetch(`${url}${titleSplit}${auth}${authFName}${APIKEY}`).then(
          //     (data) => {
          //       data
          //         .json()
          //         .then((res) => {
          //           if (res.items[0].volumeInfo.imageLinks.smallThumbnail) {
          //             imagesrc =
          //               res.items[0].volumeInfo.imageLinks.smallThumbnail;
          //           }
          //           const desc = res.items[0].volumeInfo.description;
          //           console.log(desc);
          //         })
          //         .catch((e) => {
          //           console.log("");
          //         });
          //     }
          //   );
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
        //ONCE BOTH ARRAYS HAVE BEEN FULLY CREATED, WE MAKE A POST REQUEST TO OUR BACKEND WHICH WILL POPULATES THE LOGGED IN INDIVIDUALS BOOKS IN THE DATABASE, AND THEN IT WILL GO UP AND SET THE STATE OF THE PARENT COMPONENT USING THE FUNCTION THAT WAS PASSED AS A PROP DOWN TO THIS COMPONENT. WE PASS DOWN THE PROPS OBJECT HERE IN THE BODY, SO THAT THE BACKEND CAN FIND THE USER WHO IS LOGGED IN WHEN IT QUERIES THE DATABASE
        fetch("/books", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify([readBooksArr, unreadBooksArr, props]),
        }).then((data) => {
          props.onClick();
        });
      },
    });
  };
  //THIS IS JUST AN INPUT ELEMENT WITH A TYPE OF FILE, WHICH LETS US UPLOAD A DOCUMENT FROM LOCAL STORAGE
  return (
    <React.Fragment>
      <div id="upload__div">
        <p id="upload__text">Have a GoodReads account already?</p>
        <p id="upload__text">Upload your entire shelf below!</p>
        <input id="fileItem" type="file" onChange={fileUploaded} />
      </div>
    </React.Fragment>
  );
};

export default FileUploader;
