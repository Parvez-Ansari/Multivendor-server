const mongoose = require('mongoose')

// user signup schema

let userSchema = new mongoose.Schema({
    "name": String,
    "email": String,
    "password": String,
    "uniqueID": String
  })
  // login model for users
  
let User = mongoose.model("User", userSchema)
  
module.exports = User;