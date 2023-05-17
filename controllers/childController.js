const mongoose = require("mongoose")
require("../Models/Children")
const ChildSchema = mongoose.model("Children")

exports.getAllChildren = function (request, response) {
    ChildSchema.find({})
        .then(data => {
            response.status(200).json(data)
        })
        .catch(error => {
            console.log(error);
        })
}
exports.getChild = function (request, response, next) {
    ChildSchema.findOne({ _id: request.params.id })
        .then(Child => {
            if (Child == null)
                throw new Error("Child not exists");
            else
                response.status(200).json(Child);
        }).catch(error => next(error))
}
exports.addChild = function (request, respsone, next) {
    let object = new ChildSchema({
        _id: request.body.id,
        fullName: request.body.fullName,
        age: request.body.age,
        Level: request.body.Level,
        Address: {
            city: request.body.Address.city,
            street: request.body.Address.street,
            buildingNo: request.body.Address.buildingNo
        }
    });
    object.save()
        .then(data => {
            respsone.status(201).json({ data })

        })
        .catch(error => next(error))
}
exports.UpdateChild = function (request, respsone, next) {
    ChildSchema.updateOne({
        _id: request.body.id
    }, {
        $set: {
            fullName: request.body.fullName,
            age: request.body.age,
            Level: request.body.Level,
            Address: {
                city: request.body.Address.city,
                street: request.body.Address.street,
                buildingNo: request.body.Address.buildingNo
            }
        }
    })
        .then(data => {
            respsone.status(200).json({ data: "Updated Successfully" });
        })
        .catch(error => next(error))
}
exports.DeleteChild = function (request, respsone, next) {
    ChildSchema.deleteOne({
        _id: request.params.id
    })
        .then(data => {
            respsone.status(202).json({ data: "Deleted Successfully" });
        })
        .catch(error => next(error))
}