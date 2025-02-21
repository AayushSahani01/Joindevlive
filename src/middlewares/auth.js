 const adminAuth = (req , res , next) =>{
  console.log("Admin Authentication is getting checked")
  const token = 'xyz';
  const isAdminAuthorized = (token=== 'xyz');
  if (!isAdminAuthorized) {
    res.send("UnAuthorized Request ")
  } else {
    next()
  }
 }

 const userAuth = (req, res, next) =>{
  console.log("User is Authenticate is checked")
  const token = 'xyz';
  const isAdminAuthorized = (token=== 'xyz');
  if (!isAdminAuthorized) {
    res.send("UnAuthorized Request ")
  } else {
    next()
  }
 }