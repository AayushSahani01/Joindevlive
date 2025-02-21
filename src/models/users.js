const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:"string",
        required:true,
        length:20
    },
    lastName:{
        type:"string",
        required:false,
        length:20
    },
    email:{
        type:"string",
        required:true,
        unique:true
    },
    password:{
        type:"string",
        required:true
    },
    age:{
        type:"number"
    },
    gender:{
        type:"string"
    }
})

const User = mongoose.model("User",userSchema);

module.exports = User;