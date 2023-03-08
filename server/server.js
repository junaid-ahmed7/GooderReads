const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

//connecting to db
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

  //middleware imports
  const userMiddleware = require("./controller/userController");
  const bookMiddleWare = require("./controller/bookController");

/*
 * handle parsing request body
 */
app.use(express.json());

app.post("/login", userMiddleware.loginController, (req, res, next) => {
  console.log('POST LOGIN SUCCESS');
  if (res.locals.user){
    res.status(200).send(res.locals.user);
  } else {
    res.status(400).send('NOT GOT')
  }
});

app.post("/form", userMiddleware.signUpController, (req, res, next) => {
  console.log("POST SIGNUP SUCCESS");
  res.status(200).send("success!");
});

app.post("/books", bookMiddleWare.populateShelf, (req, res, next) => {
  console.log('IN POST BOOKS');
  res.status(200).send('SUCCESS!');
})




//global error handler

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

/*
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
