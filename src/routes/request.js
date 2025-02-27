const express = require("express");
const requestRouter = express.Router();
const { authUser } = require("../middlewares/auth");
const { User } = require("../models/users");


requestRouter.post('/sendconnection',authUser,async(req,res)=>{
    try {
        const user = req.user;
        console.log("Connection Request Established!!")
        return res.status(200).send(
            user.firstName + ": sent to request"
        );
    } catch (error) {
        throw new Error("ERROR TO CONNECTION: " + error.message) 
    }
});

module.exports = requestRouter;