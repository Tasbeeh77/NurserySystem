const express = require("express");
const morgan = require('morgan');
const teacherRouter = require("./Routes/teacherRouter");
const childRouter = require("./Routes/childRouter");
const classRouter = require("./Routes/classRouter");
const LoginRouter = require("./Routes/authenticationRouter");
const authMiddleware = require("./Middlewares/authMiddleware")
const mongoose = require("mongoose")
const server = express();

mongoose.connect("mongodb://127.0.0.1:27017/Nursery")
.then(()=>{
    console.log("DB Connect");
    server.listen(8080, () => {
        console.log("server is listening....");
    }) 
})
.catch(error=>{
    console.log(error);
})

server.use(morgan('dev'))

//routes
server.use(express.json())
server.use(LoginRouter)
server.use(authMiddleware)
server.use(teacherRouter)
server.use(childRouter)
server.use(classRouter)

//Not Found middleware
server.use((request, response) => {
    response.status(404).json({ message: "not found" })
});

//Error middleware
server.use((error, request, response, next) => {
    response.status(500).json({ message: "Exception : " + error })
});