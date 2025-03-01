const express = require("express");
const profileRouter = express.Router();
const { authUser } = require("../middlewares/auth");
const { User } = require("../models/users");
const { validateEditData } = require("../utils/validation");
 

profileRouter.get('/profile',authUser, async(req,res) =>{
    try {
        const user = req.user;
        res.status(200).send(user)
        console.log("user Detailed fetched Success:")
        
    }catch(error) {
        throw new Error("ERROR CATCHED: " + error.message)
     
    }
})

profileRouter.patch('/profile/edit',authUser,async(req,res)  =>{
    try {
        if(!validateEditData (req)){
            throw new Error("Update is not allowed")
        };
        const loggedUser = req.user;
        console.log(loggedUser);

        // Contained user req.body on DB to stored  
        Object.keys(req.body).forEach((key) => {
            loggedUser[key] = req.body[key];
        })
        console.log(loggedUser);
        await loggedUser.save();
        // res.status(200).send(`User name is ${loggedUser.firstName} Updated Successfully`)
        res.json({message:`${loggedUser.firstName} Updated Successfully`,data:loggedUser});
    } catch (error) {
        res.status(400).send("ERROR CATCHED: " + error.message);
    }
}); 

module.exports = profileRouter;