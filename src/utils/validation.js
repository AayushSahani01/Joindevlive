const validator = require('validator');
 

const validateSignUpData = (req) => {
    const {firstName,gender, emailId, password} = req.body;

    if(!firstName || !gender){
        throw new Error(" Its a must field is required");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Please enter a valid email");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password");
    }
}

const validateEditData = (req) => {
    const ALLOWED_UPDATE = [  
        "firstName",
        "lastName",
        "password",
        "photoUrl",
        "about_me",
        "Skills",
    ];
     const isEditValid = Object.keys(req.body).every((item) => (ALLOWED_UPDATE.includes(item)));
     if(!isEditValid){
        throw new Error("Update is not allowed")
     }
     return isEditValid;
}

const validateForgetPass = (req) => {
    const authorizedUser = {
        emailId: req.body.emailId,

    }
    const isAuthorizedUser = Object.keys(authorizedUser).every((item) => (authorizedUser[item] = req.body[item]));
    if(!isAuthorizedUser){
        throw new Error("Update is not allowed")
     }
     return isAuthorizedUser;
} 
module.exports = {
    validateSignUpData,
    validateEditData,
    validateForgetPass
}