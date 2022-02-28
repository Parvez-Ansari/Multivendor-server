const mongoose = require('mongoose')

// user signup schema

let MerProfile = new mongoose.Schema({
    "shopName": String,
    "ownerName": String,
    "address": String,
    "contact": String,
    "category": String,
    "ImgPath": String,
    "uniqueID": String
})
// login model for users

let MerchantProfile = mongoose.model("MerchantProfile", MerProfile)

module.exports = MerchantProfile;