const express = require('express');
require("./config/database");
PORT = 3000
const connectDB = require("./config/database");
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/Home', (req, res) => {
    res.send('Home Page is Here');
})

app.post('/signup',async (req, res) =>{
    const user =  req.body({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    })
   try {
     await user.save();
     res.send("User Created successfully",user)
   } catch (error) {
     res.send("Error Occured User not Created",error)
   }
})

app.use("/*", (req, res) => {
    res.status(404).send('not founded!!');

})
connectDB()
.then(() => {
        console.log("Database Connected")
    },
    app.listen(PORT, () => {
            console.log(`Server is running on Port:${PORT}`);   
        })
    )
.catch((err) => console.log("Database Not Connected",err))
.finally(() => process.exit());
    