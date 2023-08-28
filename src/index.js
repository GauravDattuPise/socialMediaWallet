const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const dotenv = require("dotenv")
const route = require("./routes/route");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB)
.then(()=>{console.log("db connected")})
.catch((err)=>{console.log("error in db connection", err)});

app.use("/", route);

app.listen(process.env.PORT, ()=>{
    console.log("server is running on port", 5000)
})

 