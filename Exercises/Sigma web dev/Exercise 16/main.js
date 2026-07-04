import express from "express"
import mongoose from "mongoose"
import { employee as Employee } from "./modules/employee.js"

const app = express()

app.use(express.static("views"))

const randomElement = (arr) => {
    let index = Math.floor(Math.random() * arr.length)
    return arr[index]
}

const conn = mongoose.connect("mongodb://localhost:27017/Employees")

app.get("/", (req, res) => {
    res.render("index")
})

app.post("/create", async (req, res) => {
    let names = ["Harry", "Arpit", "Travis"]
    let city = ["Mumbai", "Delhi", "Bengaluru"]
    let language = ["Python", "JavaScript", "React"]

    await Employee.deleteMany()

    for (let index = 0; index < 10; index++) {
        const newEmployee = await Employee.create({
            name: randomElement(names),
            salary: Math.round(Math.random() * 1000000),
            language: randomElement(language),
            city: randomElement(city),
            isManager: Math.round(Math.random())
        })
        await newEmployee.save()
    }

    res.redirect("/")
})

app.listen(3000, () => {
    console.log("Server started")
})