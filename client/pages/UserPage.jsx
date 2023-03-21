import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import FileUploader from "../components/FileUploader";
import Book from "../components/Book/Book";
import UnreadBook from "../components/Book/UnreadBook";
import "../../stylesheets/Userpage.scss";
import { Link } from "react-router-dom";

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

  //THIS FUNCTION IS SO THAT WE CAN JUST FETCH OUR BOOKS FROM THE DATABASE, WE DONT HAVE TO ACTUALLY DO A FILE UPLOAD WHEN WE WANT TO GET OUR BOOKS. IT SENDS THE ID DOWN SO THE BACKEND KNOWS FROM WHICH USER TO FETCH THE BOOKS FROM
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
      <h1 id="user__header">Welcome to your bookshelf, {name}!</h1>
      <FileUploader props={location.state} onClick={onFileUpload} />
      {/* UPON A RERENDER WHEN THE STATE IS POPULATED WITH THE BOOKS, THESE TWO MAPS WILL RUN AND THAT WILL CREATE LISTS FOR ALL OUR BOOKS USING OUR BOOK COMPONENTS. THE REASON THERE ARE TWO COMPONENTS IS BECAUSE THE UNREAD BOOK DOESNT HAVE ALL THE SAME VALUES*/}
      {/* THIS LINK IS A LINK TO THE STATS PAGE, THE STATE BEING PASSED DOWN IS JUST AN ARRAY OF ALL OUR READ BOOKS, SINCE WE DONT NEED TO MAKE ANY STATS FOR ANY UNREAD BOOKS */}
      <div id="stats__div">
        <p id="your__stats">Curious about what you have been reading?</p>
        <button id="book__stats">
          <Link state={readBooks} id="link" to="/stats">
            Check Out Your Reading Stats!
          </Link>
        </button>
      </div>
      <section id="book__container">
        <span id="your__books">Your Read Books:</span>
        <button id="book__fetch" onClick={bookFetch}>
          Fetch My Books!
        </button>
        <div id='book__div'>
          {readBooks.map((book) => {
            return (
              <Book
                key={book.ISBN}
                title={book.title}
                author={book.author}
                rating={book.rating}
                avgRating={book.avgRating}
                pageCount={book.pageCount}
                yearOfPub={book.yearOfPub}
                dateRead={book.dateRead}
              ></Book>
            );
          })}
        </div>
      </section>
      <section>
        <p id="your__books">Your Unread Books:</p>
        {unreadBooks.map((book) => {
          return (
            <UnreadBook
              key={book.ISBN}
              title={book.title}
              author={book.author}
              avgRating={book.avgRating}
              pageCount={book.pageCount}
              yearOfPub={book.yearOfPub}
            ></UnreadBook>
          );
        })}
      </section>
    </React.Fragment>
  );
};

export default UserPage;
