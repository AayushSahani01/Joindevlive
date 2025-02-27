const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validation");
const {User}  = require("../models/users");


const authRouter = express.Router();


authRouter.post ('/signup',async (req,res)=>{   
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
        res.status(200).send("User to Added the Successfully")
    
    } catch (error){
      //throw new Error("ERROR:"+error.message)
      throw new Error(error.message)
      
    }
})

authRouter.post('/login',async (req,res)=>{
    try {
       const {emailId,password} = req.body;

       const user = await User.findOne({emailId:emailId}); 
       if (!user) {
        throw new Error("User not found");
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
         throw new Error("Please enter a valid Password");
         
        
       }
      
    } catch(error) {
        throw new Error("ERROR CATCHED: " + error.message);
    }
})

authRouter.post('/logout',async (req,res) =>{
        res.cookie("jwtToken",null,
            {
              expires:new Date(Date.now())
            });
        await res.send("Logout Successfully!!").status(200)
     
})

module.exports = authRouter;