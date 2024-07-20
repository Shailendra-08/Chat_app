const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")


const app=express();
require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());


//Database connection

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB connected Successfully")

    }catch(err){
        console.log(err);
    }
}

const server =app.listen(process.env.PORT,() => {
    console.log(`Server started on Port ${process.env.PORT}`);
    connectDB();
})