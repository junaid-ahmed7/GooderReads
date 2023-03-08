const path = require("path");
const express = require("express");

const app = express();
const PORT = 3000;

/*
 * handle parsing request body
 */
app.use(express.json());

app.post('/form', (req, res) => {
    const { firstName, lastName, email, passOne, passTwo } = req.body;
    if (passOne !== passTwo){
        console.log('no match');
    } else {
        console.log('match')
    }
    console.log('POST REQ SUCCESS');
})

//global error handler

app.use((err, req, res, next) => {
  const errorObj = { ...err };
  res.status(errorObj.status || 404).send(JSON.stringify(errorObj.message));
});

/*
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
