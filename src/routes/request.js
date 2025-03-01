const express = require("express");
const requestRouter = express.Router();
const { authUser } = require("../middlewares/auth");
const { User } = require("../models/users");
const { ConnectionRequestModel } = require("../models/connectionRequest");
const { validateEditData } = require("../utils/validation");
 
 


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

requestRouter.post('/request/send/:status/:userId',authUser,async (req,res) =>{
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.userId;
        const status = req.params.status;
        
        const allowedStatus = ["interested","ignored"]
        if(!allowedStatus.includes(status)){
            return res.status(400)
            .json({message:"Invalid Status type :"+status}) 
        }
        // here also handle it UserId to UserId itself request gone!! but now also handle it on userSchema file;
        
        // checked this UserId Present in database or not:
        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(400)
            .json({message:"Invalid user Id"})
        } 

        // Check user is Already requested or exist:
        const exitConnectionRequest = await ConnectionRequestModel.findOne({
            $or:[
                 { fromUserId:fromUserId, toUserId:toUserId },
                 {fromUserId:toUserId, toUserId:fromUserId}
            ]
        }) 
        if(exitConnectionRequest){
            return res.status(400)
            .json({message:"Connection request already exist from user:" + fromUserId ,"to user": + toUserId}) 
        } 
       
        ////////////////////////
        const connectionResponse = new ConnectionRequestModel({
           fromUserId,
           toUserId,
           status,
        })
        await connectionResponse.save()
        res.json({
            success:true,
            message:"Connection request send successfully.",
            connectionResponse
        })
    } catch (err) {
        return res.status(400).send("ERROR IS CATCHED :"+err.message)
    }
})

requestRouter.post ('/request/review/:status/:requestId',authUser,async (req,res) => {
    try {
        const loggedUser = req.user;
        const requestId = req.params.requestId;
        const status = req.params.status;
//      const {status,requestId} = req.params;

        const allowedStatus = ["accepted","rejected"]
        if(!allowedStatus.includes(status)){
            return res.status(400)
            .json({message:"Invalid Status type :"+status })
        } 
        const connectionRequest = await ConnectionRequestModel.findById({
            _id:requestId,
            toUserId:loggedUser._id,
            status:"interested"
        });
        if(!connectionRequest){
            return res.status(400)
            .json({message:"Connection request not found"})
        }
        /// Updated status of connection request;
        connectionRequest.status = status;
        await connectionRequest.save();
        res.json({
            success:true,
            message:"ConnectionRequest is review and updated successfully.",
            connectionRequest
        });
    } catch (err) {
        res.status(400).send("ERROR IS CATCHED :"+err.message)
 
    }
})
 
module.exports = requestRouter;