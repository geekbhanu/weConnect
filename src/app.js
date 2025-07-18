const express = require("express")
const connectDB = require("./config/database")
const app = express()
const User = require("./models/user")

app.use(express.json())

//API
app.post("/signup", async(req, res) =>{
    //Creating a new instance of the user model
   const user = new User(req.body);
    try{
        await user.save();
        res.send("User added successfully");
        
    }catch(err){
        res.status(400).send("Error adding user: " + err.message);
    }
})
// Get user by emailId
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try{
        const user = await User.findOne({emailId: userEmail}).exec();
        if(!user){
            res.status(404).send("User not found");
        }else{
            res.send(user);
        }
//         const user = await User.find({emailId: userEmail})
//         if(user.length === 0) {
//             res.length(404).send("User not found");
//         }else{
//  res.send(user);
//         }
    }
    catch(err){
        res.status(400).send("Something went Wrong");
    }
})
//Feed API - GET /feed - get all
app.get("/feed", async (req, res) =>{
    try{
        const users = await User.find({});
        res.send(users);
    }catch (err){
        res.status(400).send("Error fetching users: " + err.message);
    }

})
 connectDB()
.then(() =>{
    console.log("Database connection established...");
    app.listen(7777, ()=>{
        console.log("Server is successfully listening on port 7777...");
        
    });
})
    .catch((err)=>{
        console.log("Database cannot be connected");
        
    });