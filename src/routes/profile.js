const express = require('express');
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user"); // Import User model
const profileRouter = express.Router();

// Get profile by userId - GET /profile
// This API is used to get user profile by userId
profileRouter.get("/", userAuth, async (req, res) => {
    try {
        // userAuth middleware already attaches user info to req.user
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.send(user);
    } catch (err) {
        res.status(400).send("Error fetching profile: " + err.message);
    }
});

module.exports = profileRouter;