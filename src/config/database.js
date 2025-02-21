 const mongoose = require("mongoose");

 const  connectDB = async () => {
   await mongoose.connect("mongodb+srv://NamasteNode:Ayush6104@cluster0.w9hbt.mongodb.net/LocalDB")
 }
connectDB()
// .then(() => console.log("Database Connected"))
// .catch((err) => console.log("Database Not Connected",err))
// .finally(() => process.exit());

module.exports = connectDB