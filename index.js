const express = require("express");
const app = express();
const connectDB = require("./db.js");
connectDB();
const User = require("./userschema.js")
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const authMiddleware= require('./middlewares/auth.js')

app.use(express.json());

app.get("/", (req, res) => {
    res.send("fk off");
})

app.get("/about", (req, res) => {
    res.send("Sher kal hackathon jeet gya");
})

app.get("/user", (req, res) => {
    res.send({
        name: "Arpit",
        age: 19,
        role: "backend in progress"
    })
})

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existinguser = await User.findOne({ email });
        if (existinguser) {
            res.status(400).json({ message: "user already exists" });
        }
        const hashedpassword = await bcrypt.hash(password, 10)

        const user = new User({ name, email, password: hashedpassword })
        await user.save()
        res.status(201).json({ message: "user created succesfully" })
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message })
    }

})

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            res.status(404).json({ message: "user not found" })
        }
        const ismatch= await bcrypt.compare(password,user.password)
        if(!ismatch){
            res.status(400).json({message:'password is incorrect'})
        }

        const token = jwt.sign(
            {id : user._id},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        )

        res.json({message: 'Login Succesful',token})
    }catch(err){
        res.status(500).json({message:'server Error', error :err.message})
    }
})

app.get('/profile',authMiddleware,async (req,res)=>{
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
})

app.listen(3000, () => {
    console.log("server is running");
})
