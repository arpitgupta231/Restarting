const express = require("express");
const app= express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("fk off");
})

app.get("/about",(req,res)=>{
    res.send("Sher kal hackathon jeet gya");
})

app.get("/user",(req,res)=>{
    res.send({
        name: "Arpit",
        age:19,
        role:"backend in progress"
    })
})

app.post("/register",(req,res)=>{
    const {name,email}= req.body;
    res.json({
        "message": "User registered successfully",
        "user": {
            name,
            email
        }
    })
})      
        
app.listen(3000, ()=>{
    console.log("server is running");
})
