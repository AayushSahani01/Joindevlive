const e = require("express");
const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.ObjectId,
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
            "pending"
          ],
         message: `{VALUE} is not supported` 
        }
    },
},{
    timestamps: true
});

const ConnectionRequestModel = new mongoose.model("ConnectionRequest",connectionRequestSchema); 

module.exports = {
    ConnectionRequestModel
}