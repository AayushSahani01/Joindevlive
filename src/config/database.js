 const mongoose = require("mongoose");
 

 const  connectDB = async () => {
   await mongoose.connect("mongodb+srv://NamasteNode:Ayush6104@cluster0.w9hbt.mongodb.net/LocalDB");
 }
 
module.exports = connectDB;