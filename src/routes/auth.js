const express = require('express');
const authRouter = express.Router();
const  validateSignUpData  = require("../utils/validation")
const User = require("../models/user");
const bcrypt = require("bcrypt")

authRouter.post("/signup", async(req, res) =>{
    try {
    // Validation of data is required
        validateSignUpData(req);
        const { firstName, lastName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10); // Hash the password with a salt rounds of 10
        console.log(passwordHash);
    //Encrypt the password before saving it to the database

    //Creating a new instance of the user model
   const user = new User({
    firstName,
    lastName,
    emailId,
    password: passwordHash, // Use the hashed password
   });
    
        await user.save();
        res.send("User added successfully");
        
    }catch(err){
        res.status(400).send("Error adding user: " + err.message);
    }
});
authRouter.post("/login", async (req, res) => {
    try {
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId: emailId})
        if(!user){
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await user.validatePassword(password); // Use the validatePassword method to check the password
        if(isPasswordValid){
            //Create a JWT token for the user
            // Add the token to the cookie and send the response back to the user
            const token = await user.getJWT(); // Call the getJWT method to generate the token
            res.cookie("token", token, {
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Set cookie to expire in 7 days
            }); // Set the token in a cookie
            res.send("Login successful");
        }else{
            throw new Error("Invalid credentials");
        }
    }catch(err) {
        res.status(400).send("Login failed: " + err.message);
    }
});
module.exports = authRouter;