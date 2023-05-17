const mongoose = require("mongoose")
const { AutoIncrementID } = require("@typegoose/auto-increment")

const schema = new mongoose.Schema(
    {
        _id: Number,
        Name: String,
        Supervisor: { type: Number, ref: "Teachers" },
        children: { type: Array, ref: "Children" }
    });

schema.plugin(AutoIncrementID, {});
mongoose.model("Classes", schema)
