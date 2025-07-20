const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;
    console.log("sending connection request from user:", user._id);
    res.send(user.firstName + " " + user.lastName + " is sending a connection request");
//sending a connection request
res.send("Connection request sent successfully");
});
module.exports = requestRouter;