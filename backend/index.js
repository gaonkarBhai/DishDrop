const express = require("express");
const app = express();
const connDb = require("./db.js");
const port = process.env.PORT || 8000;

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    next();
})
connDb()
app.use(express.json());
app.use("/api",require("./routes/createUser.js"))
app.use("/api",require("./routes/displayData.js"))
app.get("/",(req,res)=>{
    res.send("SERVER ON")
})

app.listen(port,()=>console.log("SERVER ON"));