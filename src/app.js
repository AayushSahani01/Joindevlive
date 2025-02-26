const express = require("express");
const { authAdmin, authUser } = require("./middlewares/auth");
const { connectDB } = require("./config/database");
const { User } = require("./models/users");

const app = express();
//app.use('/admin',authAdmin);
//app.use('/user',authUser);


// app.get('/user',authUser,(req,res) =>{
//  res.send({
//      name:"Ayush Sahani",
//      age:1,
//      gender:"Male"})
// }) 

// app.post('/user/login',(req,res) =>{
//     res.send("Login Successfully")
// })
app.use(express.json());
app.post ('/signup',async (req,res)=>{
    console.log(req.body);
 // Creating a new Instance of User Model;
    const user = new User (req.body);
   // const user = new User({
        
        // firstName: req.body.firstName, 
        // lastName:req.body.lastName,  
        // emailId: req.body.emailId,
        // password: req.body.password,
       
    //})  
    
    try {
            await user.save();
            res.send("User to Added the Successfully")
    
    } catch (error) {
       throw new Error("User Adding Error"),
       {status:400} 
    }
})

app.get('/user/data',async (req,res)=> {
    const userEmail = req.body.emailId;
     //fetch user to DB then send data
     try {
        const users = await User.findOne({emailId:userEmail});
        if(!users){
    res.send("User not found!"),
    {status:404}
        }
        else{
        res.send(users)
        }
     } catch{
        res.send("Data fetch Error").status(400)
     }
    
});

app.delete('/user',async(req,res)=>{
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete({_id:userId})
        console.log(user)
        //const userId = async User.findByIdAndDelete(userId);
        //fetch user then deleted from database
        res.send("User Deleted Successfully")
    } catch  {
        res.send("Someting went wrong while deleting user").status(400)
    }
})

// Updated user deatails: PATCH API
app.patch('/user',async(req,res) =>{
    const userId = req.body.userId;
    const data = req.body;
try {
    const ALLOWED_UPDATE = [  "firstName",
        "lastName","password","photoUrl","about_me",
        "Skills",
    ];
    const isUpdateAllow = Object.keys(data).every((k) =>ALLOWED_UPDATE.includes(k)
    );
    if(!isUpdateAllow){
        throw new error("This is fields not allowed to update")
    }
     const user = await User.findByIdAndUpdate({_id:userId},data,{
     returnDocument:"after",
            // Validated field want to update use by runValidator:
        runValidators:true,
        });
    console.log(user)
    res.send("User Updated Successfully!!");
    } catch  {
        res.send("Someting went wrong while updating user").status(400)  
    }
})
// app.use((req,res)=>{
    //     res.send("Welcome to Dev Tinder API")
    // });   

// app.get('/admin/user',(req,res)=>{
//     //checking  user is authorized or not =>> middleware
//     res.send("Detailed to User List")
// })

// app.delete('/admin/delete',(req,res)=>{
//     res.send("admin user deleted Successfully!")
// })

app.use('/',(err,req,res,next)=>{
   // Above declared four arguments is fixed position.
   if(err) {
    // All error locked here
    res.send("something went wrong",err.message);
   }
})


connectDB()
.then(() =>{
    console.log("Database connection Established Successfully!!")
app.listen(7777,()=>{
    console.log("Server is Running on Port 7777...");
})
})
.catch( (error) =>{
    console.log("Database connection Failed!!", error)
})
