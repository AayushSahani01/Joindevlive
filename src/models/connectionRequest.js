const e = require("express");
const mongoose = require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.ObjectId,
        ref:"User", /// reference database user collection;
        required:true
    },
    toUserId:{
        type: mongoose.Schema.ObjectId,

    },
    status:{
        type: String,
        enum: { 
          values: [ 
            "interested", "ignored","accepted","rejected",
           
          ],
         message: `{VALUE} is not supported` 
        }
    },
    },{
        timestamps: true
    }
);

// connectionRequestSchema.index({
//    firstName:1
// });
connectionRequestSchema.pre("save",function(next){
    const connectionRequest = this;
    // check if the fromUserId and toUserId is same or not:
    if(connectionRequest.fromUserId .equals(connectionRequest.toUserId)){ 
        return res.send("fromUserId and toUserId can't be same, wrong ")
        /// THIS IS NOT WORKING PROPERLY
    }
    console.log("connectionRequest",connectionRequest);

    next();
})

const ConnectionRequestModel = new mongoose.model("ConnectionRequest",connectionRequestSchema); 

module.exports = {
    ConnectionRequestModel 
};