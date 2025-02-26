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

module.exports = {
    validateSignUpData
}