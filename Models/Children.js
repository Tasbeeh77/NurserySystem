const mongoose = require("mongoose")
//generate schema
const schema = new mongoose.Schema(
    {
        _id:Number,
        fullName:String,
        age:Number,
        Level:String,
        Address:Object
    })

//mapping
mongoose.model("Children",schema)
