const express = require("express")
const app = express()
const fs = require('fs')
const path = require('path')

app.use((req,res,next)=>{
    let dir = __dirname
    let files = fs.readdirSync(dir)
    for (const file of files) {
        let ext = file.split(".")[1]
        if(ext != "json" && ext != "js" && file.split(".").length > 1){
            if(fs.existsSync(path.join(dir,ext))){
                fs.renameSync(path.join(dir,file),path.join(dir,ext,file))
            }
            else{
                fs.mkdirSync(ext)
                fs.renameSync(path.join(dir,file),path.join(dir,ext,file))
            }
        }
    }
    next()
})

app.get("/",(req,res)=>{
    res.send("Fuddu")
})

app.listen(3000,()=>{
    console.log("Server started")
})