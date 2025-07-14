const express = require("express");
const app = express();
const {adminAuth, userAuth} = require("./middlewares/auth")
app.use("/admin", adminAuth),
app.use("/user", userAuth)
//middleware
app.post("/user/login", (req, res)=>{
    res.send("User logged in successfully")
})
//API
app.get("/admin/getAllData", (req,res)=>{
    res.send("All data sent");
})
app.get("/user", (req,res)=>{
    res.send("user data sent");
})
app.get("/admin/deleteUser", (req,res)=>{
    res.send("Deleted a user");
});
app.listen(7777, ()=>{
    console.log("Server is successfully listening on port 7777..");
})