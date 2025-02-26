const authAdmin = (req,res,next)=>{
    console.log("Admin is authorized or not")
    const token = 'xyz';
    const isadminAuthorized = token === 'xyz';
    if(!isadminAuthorized){
        res.send( "Unauthorized User") 
    }else{
        next();
    }
}
const authUser = (req,res,next)=>{
    console.log("user is authorized or not")
    const token = 'xyz';
    const isadminAuthorized = token === 'xyz';
    if(!isadminAuthorized){
        res.send( "Unauthorized User") 
    }else{
        next();
    }
}

module.exports = {
    authAdmin,
    authUser
};