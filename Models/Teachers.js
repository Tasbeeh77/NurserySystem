const mongoose = require("mongoose")
//generate schema
const schema = new mongoose.Schema(
    {
        _id:Number,
        fullName:String,
        Password:String,
        Email:{type:String, unique:true},
        image:String
    })

//mapping
mongoose.model("Teachers",schema)
