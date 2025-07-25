const express = require("express")
const connectDB = require("./config/database")
const app = express()
const cookieParser = require("cookie-parser")
app.use(express.json())
app.use(cookieParser()) // Middleware to parse cookies
const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/request", requestRouter);
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