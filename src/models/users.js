const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:"string",
        required:true,
        length:20
    },
    lastName:{
        type:"string",
        length:20
    },
    email:{
        type:"string",
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new error("Invalid email address...")
            }
        }
    },
    password:{
        type:"string",
        required:true
    },
    age:{
        type:"number"
    },
    gender:{
        type:"string",
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Gender must be male or female or other")
            }
        }
    }
},
 {timestamps:true}
);

const User = mongoose.model("User",userSchema);

module.exports = User;