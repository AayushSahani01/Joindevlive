const express = require("express");
const {authUser} = require("../middlewares/auth");
const { ConnectionRequestModel } = require("../models/connectionRequest");

const userRouter = express.Router();

const USER_COLLECTION =  "firstName lastName emailId gender photoUrl about_me Skills";

userRouter.get('/user/request/recieved', authUser, async(req,res)=>{
    try {
        const inLoggedUser = req.user; 

        const connectionRequest = await ConnectionRequestModel.find({
            _id:inLoggedUser._id,
            toUserId:inLoggedUser._id,
            status:"interested" 
        }).populate("fromUserId", USER_COLLECTION);

        res.json({
            message: "connection of User fetched success",
            data: connectionRequest,
        })
    } catch (e) {
        throw new Error("ERROR IN USER:"+e.message)
        
    }
})

userRouter.get('/user/collection', authUser, async(req,res)=>{
    try {
        const inLoggedUser = req.user;
    
        const connectionRequest = await ConnectionRequestModel.find({
            $or:[
                {fromUserId:inLoggedUser._id,status:"accepted"},
                {toUserId:inLoggedUser._id,status:"accepted"}
            ]
        }).populate("fromUserId",USER_COLLECTION);
        //const data = connectionRequest.map((row) => {
        // if(row.fromUserId.toString() === inLoggedUser._id.toString()){
        //  return row.toUserId 
        // }
        //return row.fromUserId
        //}

    res.json({
        message: "connection of User fetched success",
        data: connectionRequest,
    })
    } catch (e) {
         return res.status(400).send("ERROR IS CATCHED :"+e.message)
      }
})  
module.exports = {
    userRouter
}