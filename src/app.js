const express = require ('express');

const app = express();
//this will only handle get call to /user
app.get("/user", (req, res)=>{
    res.send({firstName: "Bhanu", lastName: "Srivastava"})
})

//this will match all the http method calls to /test
app.use("/test", (req, res)=>{
    res.result("Hello from the server");
})
app.delete("/user", (req, res) =>{
    res.send("Deleted Succesfully");
})
app.listen(7777,()=> {
    console.log("server is successfully running on port 7777");
    
});