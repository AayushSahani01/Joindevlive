const express = require("express");
const { authAdmin, authUser } = require("./middlewares/auth");
const { connectDB } = require("./config/database");
const { User } = require("./models/users");
const { validateSignUpData } = require("./utils/validation.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();

//app.use('/admin',authAdmin);
//app.use('/user',authUser);


// app.get('/user',authUser,(req,res) =>{
//  res.send({
//      name:"Ayush Sahani",
//      age:1,
//      gender:"Male"})
// }) 

// app.post('/user/login',(req,res) =>{
//     res.send("Login Successfully")
// })
app.use(express.json());
app.use(cookieParser());

app.post ('/signup',async (req,res)=>{   
    try{
        console.log(req.body);
        //validation of Data:
        validateSignUpData(req);
        
        const {password} = req.body;
        //Encryption of Password:
        const passwordHash = await bcrypt.hash(password , 10);
        console.log(passwordHash);
        
        // Creating a new Instance of User Model;
        //const user = new User(req.body);
        const user = new User({
            firstName:req.body.firstName,gender:req.body.gender,
            emailId:req.body.emailId,
            password:passwordHash
        })
 
       await user.save();
        res.send("User to Added the Successfully")
    
    } catch (error){
      //throw new Error("ERROR:"+error.message)
        res.send(error.message).status(400)
      
    }
})

app.post('/login',async (req,res)=>{
    try {
       const {emailId,password} = req.body;
       const user = await User.findOne({emailId:emailId}); 
       if(!user){
        res.send("User not found"),
        {status:404}
       
       }
       const isValidPassword = await user.validatePassword(password);
       if(isValidPassword){
        // Create a JWT TOKEN;
    //const token = await jwt.sign({_id:user._id},"Anshu$As@540",{
    //         expiresIn:"7d"
    //     }
    // );
        const token = await user.getJWT();
        console.log(token);
        
        // Add TOKEN to Cookies and Sending the User's:
        res.cookie("jwtToken",token,{
            expires: new Date(Date.now() + 60*1000)
        });
        res.send("Login Successfully!!"),
        {status:200}
       }
       else{
        res.send("Please enter a valid Password")
        .status(404)
        
       }
      
    } catch(error) {
        res.send(error.message).status(400)
    }
})

app.post('/sendconnection',authUser,async(req,res)=>{
    try {
        const user = req.user;
        console.log("Connection Request Established!!")
        res.send(
            user.firstName + ": sent to request ");
    } catch (error) {
        throw new Error ("ERROR TO CONNECTION: " + error.message) 
    }
})

app.get('/profile',authUser, async(req,res) =>{
try {
    const user = req.user;
     res.send(user)
       
    }catch(error) {
        res.send("ERROR CATCHED: " + error.message).status(400)
     
    }
})

app.get('/user/data',async (req,res)=> {
    const userEmail = req.body.emailId;
     //fetch user to DB then send data
     try {
        const users = await User.findOne({emailId:userEmail});
        if(!users){
    res.send("User not found!"),
    {status:404}
        }
        else{
        res.send(users)
        }
     } catch{
        res.send("Data fetch Error").status(400)
     }
    
});

app.delete('/user',async(req,res)=>{
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete({_id:userId})
        console.log(user)
        //const userId = async User.findByIdAndDelete(userId);
        //fetch user then deleted from database
        res.send("User Deleted Successfully")
    } catch  {
        res.send("Someting went wrong while deleting user").status(400)
    }
})

// Updated user deatails: PATCH API
app.patch('/user/:userId',async(req,res) =>{
    const userId = req.params.userId;
    const data = req.body;
try {
    const ALLOWED_UPDATE = [  
        "firstName",
        "lastName",
        "password",
        "photoUrl",
        "about_me",
        "Skills",
    ];
    const isUpdateAllow = Object.keys(data).every((update) => ALLOWED_UPDATE.includes(update)
    )
    if(!isUpdateAllow){
        res.status(400).send("Update is not allowed")
    }
    const user = await User.findByIdAndUpdate({_id:userId},data,{
     returnDocument:"before",
     runValidators:true
    // Validated field want to update use by runValidator:
        
    });
    console.log(user)
    res.send("User Updated Successfully!!");
   
    } catch  {
        res.send("Someting went wrong while updating user").status(400)  
    }
});

 
// app.use((req,res)=>{
    //     res.send("Welcome to Dev Tinder API"
// });   

// app.get('/admin/user',(req,res)=>{
//     //checking  user is authorized or not =>> middleware
//     res.send("Detailed to User List")
// })

// app.delete('/admin/delete',(req,res)=>{
//     res.send("admin user deleted Successfully!")
// })

app.use('/',(err,req,res,next)=>{
   // Above declared four arguments is fixed position.
   if(err) {
    // All error locked here
    res.send("something went wrong",err.message);
   }
})


connectDB()
.then(() =>{
    console.log("Database connection Established Successfully!!")
app.listen(7777,()=>{
    console.log("Server is Running on Port 7777...");
})
})
.catch( (error) =>{
    console.log("Database connection Failed!!", error)
})
