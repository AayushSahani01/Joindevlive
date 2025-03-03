const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models/users");

const passwordRouter = express.Router();
const {validateForgetPass} = require("../utils/validation");

passwordRouter.patch('/forgetpassword',async(req,res)=>{
    try {
        if(validateForgetPass(req)){
            const newPassword = (req.body.password);
            console.log(newPassword);
            await User.findOneAndUpdate({emailId:req.body.emailId},{password:newPassword});

            res.send("Password Reset Successfully")
            
            await newPassword.save();

        }
        else{
            throw new Error("Update is not allowed")
        }
    } catch (error) {
        throw new Error("ERROR IS CATCHED:"+error.message)
    }
})

module.exports = {
    passwordRouter
}