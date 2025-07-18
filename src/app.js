const express = require("express")
const connectDB = require("./config/database")
const app = express()
const User = require("./models/user")

app.use(express.json())

//API - signup API - POST /signup
// This API is used to create a new user
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
// Get user by emailId  - GET /user
// This API is used to get user details by emailId
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
//Feed API - GET /feed - GET all users
// This API is used to get all users
app.get("/feed", async (req, res) =>{
    try{
        const users = await User.find({});
        res.send(users);
    }catch (err){
        res.status(400).send("Error fetching users: " + err.message);
    }

})
// Delete user by userId - DELETE /user
// This API is used to delete a user by userId
app.delete("/user", async (req, res) =>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete({_id:userId});
        // const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    }catch(err){
        res.status(400).send("Something went wrong while deleting the user: " + err.message);
    }
})
// Update user by userId - PUT /user
// This API is used to update a user by userId
app.patch("/user", async (req, res) =>{
    const userId = req.body.userId;
    const data = req.body;
    try{
        await User.findByIdAndUpdate({_id: userId },data, {returnDocument: "before"});
        res.send("User updated successfully");
    }catch (err){
        res.status(400).send("Something went wrong")
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