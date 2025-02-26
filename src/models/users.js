const mongoose = require('mongoose');

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

const User =mongoose.model("User", userSchema);

module.exports = {
    User
} 