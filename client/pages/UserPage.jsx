import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import FileUploader from "../components/FileUploader";

//THIS IS THE USERS OWN PERSONAL ACCOUNT PAGE, THE USE LOCATION IMPORT AT THE TOP IS WHAT ALLOWS US TO GET THE USER OBJECT THAT WE CREATED ON THE PREVIOUS LOGIN COMPONENT
const UserPage = () => {
  //USING THE LOCATION TO GET ACCESS TO PASSED DOWN STATE PROP
  const location = useLocation();

  //GRABBING THE ID AND NAME FROM THE LOCATION STATE OBJECT
  const id = location.state._id;
  const name = location.state.firstName + " " + location.state.lastName;

  //SETTING INITIAL STATE FOR THE TWO SHELVES
  const [readBooks, setReadBooks] = useState([]);
  const [unreadBooks, setUnreadBooks] = useState([]);

  //THIS FUNCTION IS SO THAT WE CAN JUST FETCH OUR BOOKS FROM THE DATABASE, WE DONT HAVE TO ACTUALLY DO A FILE UPLOAD WHEN WE WANT TO GET OUR BOOKS.
  const bookFetch = () => {
    fetch(`/books/${id}`).then((data) => {
      data.json().then((data) => {
        //SETTING THE STATE FROM THE RESPONE BODY. IN THE BACKEND WE SET THE RES LOCALS TO HAVE TWO PROPERTIES FOR BOTH BOOKSHELVES
        setReadBooks(data.readShelf);
        setUnreadBooks(data.unreadShelf);
      });
    });
  };

  //THIS FILE UPLOAD FUNCTION IS PASSED DOWN TO THE FILEUPLOADER COMPONENT, WHICH, WHEN ITS DONE DEALING WITH THE UPLOADED FILE, IT IS GOING TO CALL THIS FUNCTION, SO THAT WE ARE BACK IN THIS COMPONENT AND CAN RENDER IT CONDITIONALLY NOW. THIS IS ONLY USED IF THE USER WANTS DECIDES TO UPLOAD THEIR BOOKS USING THE FILE INPUT UPLOADER
  const onFileUpload = () => {
    //MAKING GET REQUEST TO EXPRESS BACKEND WITH THE USERS ID, SO THAT WE CAN GET THE BOOKSHELVES FOR THE USER
    fetch(`/books/${id}`).then((data) => {
      data.json().then((data) => {
        //SETTING THE STATE FROM THE RESPONE BODY. IN THE BACKEND WE SET THE RES LOCALS TO HAVE TWO PROPERTIES FOR BOTH BOOKSHELVES
        setReadBooks(data.readShelf);
        setUnreadBooks(data.unreadShelf);
      });
    });
  };
  return (
    <React.Fragment>
      <h1>Welcome to your bookshelf {name}!</h1>
      <FileUploader props={location.state} onClick={onFileUpload} />
      {/* UPON A RERENDER WHEN THE STATE IS POPULATED WITH THE BOOKS, THESE TWO MAPS WILL RUN AND THAT WILL CREATE LISTS FOR ALL OUR BOOKS */}
      <section>
        <button onClick={bookFetch}>Fetch My Books!</button>
        <p>Your Read Books:</p>
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
      </section>
      <section>
        <p>Your Unread Books:</p>
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
      </section>
    </React.Fragment>
  );
};

export default UserPage;
