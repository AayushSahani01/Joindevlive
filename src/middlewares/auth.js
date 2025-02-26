const jwt = require ('jsonwebtoken');
const { User } = require('../models/users');


//  const authAdmin = (req,res,next)=>{
//     console.log("Admin is authorized or not")
//     const token = 'xyz';
//     const isadminAuthorized = token === 'xyz';
//     if(!isadminAuthorized){
//         res.send( "Unauthorized User") 
//     }else{
//         next();
//     }
// }
const authUser = async (req,res,next)=>{
    // console.log("user is authorized or not")
    // const token = 'xyz';
    // const isadminAuthorized = token === 'xyz';
    // if(!isadminAuthorized){
    //     res.send( "Unauthorized User") 
    // }else{
    //     next();
    // }

    /// Read the TOKEN from the req.body;

   try {
     const cookies = req.cookies;
     const token = cookies.jwtToken;
     if(!token){
        res.send ("token is not provided!!")
     }
     // Validated TOKEN:
     const decodedMsg = await jwt.verify(token,"Anshu$As@540");
     const {_id} = decodedMsg;
     console.log("Logged User Info:",_id);
  
     // find the User:
     const user = await User.findById(_id);
     if(!user){
          res.send("User is not valid!")
     }
     else{
        req.user = user;
        next();
     }
     res.send("User not found").status(404);  
    
    console.log(cookies);
    console.log(decodedMsg);
 }catch (error) {
    res.send("ERROR IS FOUNDED: " + error.message)
   }
};

module.exports = {
   // authAdmin,
    authUser
  } 