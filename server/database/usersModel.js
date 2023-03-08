const mongoose = require("mongoose");
const { Schema } = mongoose;

//THIS IS OUR DATABASE FOR ALL USERS. THE ONLY ENTRY NOT REQUIRED IS THE TWO BOOKSHELVES, AS A USER WILL NOT HAVE ANY BOOKS WHEN THE NEW ACCOUNT IS MADE

const usersSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bookShelfRead: {
    type: Array
  },
  bookShelfUnread: {
    type: Array
  }
});
const User = mongoose.model("user", usersSchema);
module.exports = User;
