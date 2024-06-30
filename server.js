const express = require("express");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const mongoose = require("mongoose");
require('dotenv').config()

const collectionRoute = require("./routes/collectionRoute");
const postRoutes = require("./routes/postRoutes");


connectDB();

const app = express(); 
app.use(express.json());

var cors = require('cors')

app.use(cors()) 
   
app.get('/',(req,res)=>{ 
  
    res.send("API is runing"); 

});

app.use('/api/user',userRoutes)   


app.use('/api/collection',collectionRoute);
app.use('/api/posts',postRoutes)

const server = app.listen(5000,console.log("Server started"))



