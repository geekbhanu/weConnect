const express = require('express');
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user"); // Import User model
const profileRouter = express.Router();
const { validateEditProfileData } = require("../utils/validation");

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
profileRouter.patch("/", userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            throw new Error("Invalid fields in profile update");
        }

        // Fetch the user from the database
        const loggedInUser = await User.findById(req.user._id);
        if (!loggedInUser) {
            throw new Error("User not found");
        }

        // Update the fields in the user object
        Object.keys(req.body).forEach((key) => {
            loggedInUser[key] = req.body[key];
        });

        // Save the updated user to the database
        await loggedInUser.save();

        res.json({
            message: `${loggedInUser.firstName}, Your Profile updated successfully`,
            data: loggedInUser
        });
    } catch (err) {
        res.status(400).send("Error updating profile: " + err.message);
    }
});
module.exports = profileRouter;