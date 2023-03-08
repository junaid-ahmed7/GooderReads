const mongoose = require("mongoose");
const { Schema } = mongoose;

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
