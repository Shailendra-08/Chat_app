const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoutes = require("./Routes/userRoutes")
const socket = require("socket.io");

const messageRoutes = require('./Routes/messages')

const app=express();
require("dotenv").config();


//Database connection

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB connected Successfully")

    }catch(err){
        console.log(err);
    }
}


//middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth",userRoutes)
app.use("/api/messages", messageRoutes);



const server =app.listen(process.env.PORT,() => {
    console.log(`Server started on Port ${process.env.PORT}`);
    connectDB();
})