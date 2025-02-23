 const express = require("express");
 const connectDB = require("./config/database");
const { connect } = require("mongoose");
const app = express();
const User = require("./models/users");
const {validateSignUpData} = require ("./utils/validation");

app.use(express.json());

 app.get('/',(req,res) =>{
    res.send("Hello World")
 })
app.get('/users',(req,res) =>{
    res.send("hello there Users")
 });
app.post('/users',async (req,res) => {
    console.log(req.body);
    validateSignUpData(req);
    //Creating a new instance of user model
    const user = new User (req.body);
     try{
        await user.save();
        res.status(201).send("User is created",user)
     }catch(err){
        res.status(400).send(err)
    }
     }
 
 );
 app.patch('/user',async (req,res) => {
    const userId = req.params.userId;
    const data = req.body;
    res.send("hello there Users")
    try {
      const user = await User.findOneAndUpdate({ _id: userId }, data)
      returnDocument : "after"
    }
    catch (err) {
      return res.status(400).send(err)
    }
   })
  app.delete('/users/:id',(req,res) => {
    res.send("hello there Users")
 });
//  app.use ('/*',(req,res) => {
//     res.error("404 Not Found")
//  });

 connectDB()
   .then(() =>{
    console.log("Database connection is successful");
    app.listen(7777,() =>{
        console.log("Server is running on port 7777...")
    })
   })
   .catch((err) => console.log("Database connection failed",err));