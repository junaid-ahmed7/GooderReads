const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

//CONNECTING TO THE DATABASE
mongoose
  .connect(
    "mongodb+srv://junaid:dzS50Os5DU3iP7hF@cluster0.vnwh8qf.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((res) => {
    console.log("MONGO CONNECTED");
  })
  .catch((err) => {
    console.log("MONGOOSE FAILED");
  });

//IMPORTING MIDDLEWARE
const userMiddleware = require("./controller/userController");
const bookMiddleWare = require("./controller/bookController");

//HANDLE PARSING REQUEST BODIES
app.use(express.json());

//ROUTE FOR THE WHEN A USER PRESSES THE LOGIN BUTTON
app.post("/login", userMiddleware.loginController, (req, res, next) => {
  //WE SET THIS PROPERTY ON RES LOCALS TO BE EQUAL TO THE FOUND USER, SO THIS FIRST LINE WILL RUN IF THE USER WAS FOUND. OTHERWISE THE VALUE IS NULL SO WE WILL SEND A 400 ERROR AND THE USER WONT BE LOGGED IN
  if (res.locals.user) {
    res.status(200).send(res.locals.user);
  } else {
    res.status(400).send("NOT GOT");
  }
});

//ROUTE FOR WHEN USER TRIES TO SIGNUP
app.post("/form", userMiddleware.signUpController, (req, res, next) => {
  //SINCE PRETTY MUCH ALL OUR VAIDATION ERROR HANDLING WAS DONE ON THE FRONTEND, IF WE REACH THIS LINE, THAT MEANS EVERYTHING WENT WELL, BOTH WITH THE VALIDATION AND CREATING THE ENTRY IN THE DATABASE, SO WE CAN JUST SEND A 200 CODE BACK
  res.status(200).send("success!");
});

//ROUTE FOR ADDING BOOKS TO THE USERS SHELF WHEN WE UPLOAD THE CSV FILE
app.post("/books", bookMiddleWare.populateShelf, (req, res, next) => {
  res.status(200).send("SUCCESS!");
});

//THIS ROUTE RUNS WHEN THE FETCH MY BOOKS BUTTON IS CLICKED, IT WILL QUERY THE DATABASE USING THE ID THAT IS PASSED DOWN AND THEN SEND BACK THE BOOKSHELVES ON THE RES LOCALS OBJECT
app.get("/books/:id", bookMiddleWare.getBooks, (req, res, next) => {
  res.status(200).send(res.locals);
});

//GLOBAL ERROR HANDLING
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//STARTING THE BACKEND SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
