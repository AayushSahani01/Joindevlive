const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ConnectionRequestModel } = require("./connectionRequest");

const userSchema = new mongoose.Schema({
    // Always Written in CammelTypes;
    firstName:{
        type: String,
        required: true,
        maxlength: 20

    },
    lastName:{
        type: String,
    },
    emailId:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("Please enter a valid email")
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 8,

    },
    // confirmPassword: {
    //     type: String,
    //     required: true,
    //     trim: true,
    // },
    age:{
        type: Number,
        min:12,
    },
    gender:{
        type: String,
        //enum: ["Male","Female","Other"],
        validate(value){
            if(["male","female","other"]
              .includes(value)  
            ){
                throw new Error("enter Please valid a Gender")
            }
        }
    },
    photoUrl:{
        type: String,
        default:"https://cdn.pixabay.com"
    },
    about_me:{
        type: String,
        default: "Nothings Here!!",
    },
    Skills:[{
        type: String,
        maxlength:10
    }]
},{
    timestamps: true
});

// userSchema.index({
//    firstName:1
// })
userSchema.methods.getJWT = async function(){
    const user = this;

    const token = await jwt.sign({
        _id:user._id
    },"Anshu$As@540",{
        expiresIn:"7d"
    });
    return token;
}
    
userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password;

    const isValidPassword = await bcrypt.compare(passwordInputByUser, passwordHash);

    return isValidPassword;
}

const User = mongoose.model("User", userSchema);

module.exports = {
    User
} 