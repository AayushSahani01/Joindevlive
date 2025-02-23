 const validateSignUpData = (req) =>{
     const {firstName,lastName,email,password} = req.body;
     if(!firstName || !lastName || !email || !password){
        throw new Error("All fields are required");
     }
     if(!validator.isEmail(email)){
        throw new Error("Enter a valid email");
     }
     if(!validator.isStrongPassword(password)){
        throw new Error("Password must be strong");
     }
 }

module.exports = {validateSignUpData};