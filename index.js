const express = require("express");
const app = express();
const connectDB = require("./db.js");
connectDB();
const User = require("./userschema.js")
const bcrypt = require("bcryptjs");

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
    const { name, email,password} = req.body;

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

app.listen(3000, () => {
    console.log("server is running");
})
