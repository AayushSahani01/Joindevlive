const express = require("express");
const requestRouter = express.Router();
const { authUser } = require("../middlewares/auth");
const { User } = require("../models/users");
const { ConnectionRequestModel } = require("../models/connectionRequest");


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
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        
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
        res.send("ERROR IS CATCHED :"+err.message)
    }
})
 
module.exports = requestRouter;