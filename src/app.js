const express = require("express");
const app = express();

// ac, abc

app.get("/user/:userId/:name/:password", (req, res) => {
    console.log(req.params);
    
    res.send({firstName: "Bhanu", lastName: "Srivastava"});
});
app.listen(7777, ()=>{
    console.log("Server is listening on port 7777...")
});