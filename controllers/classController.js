const mongoose = require("mongoose")
require("../Models/Classes")
const ClassSchema = mongoose.model("Classes")

exports.getAllClasses = function (request, response) {
    ClassSchema.find({})
        .then(data => {
            response.status(200).json(data)
        })
        .catch(error => {
            console.log(error);
        })
}
exports.getClass = function (request, response, next) {
    ClassSchema.findOne({ _id: request.params.id })
        .then(Class => {
            if (Class == null)
                throw new Error("Class not exists");
            else
                response.status(200).json(Class);
        }).catch(error => next(error))
}

exports.addClass = function (request, respsone, next) {
    let object =  new ClassSchema({
        Name: request.body.Name,
        Supervisor: request.body.Supervisor,
        children: request.body.children,
    });
    object.save()
        .then(data => {
            respsone.status(201).json({ data })
        })
        .catch(error => next(error))
}

exports.UpdateClass = function (request, respsone, next) {
    ClassSchema.updateOne({
        _id: request.body.id
    }, {
        $set: {
            Name: request.body.Name,
            Supervisor: request.body.Supervisor,
            children: request.body.children,
        }
    })
        .then(data => {
            respsone.status(200).json({ data: "Updated Successfully" });
        })
        .catch(error => next(error))
}
exports.DeleteClass = function (request, respsone, next) {
    ClassSchema.deleteOne({
        _id: request.params.id
    })
        .then(data => {
            respsone.status(202).json({ data: "Deleted Successfully" });
        })
        .catch(error => next(error))
}
exports.getClassChildren = function (request, response, next) {
    ClassSchema.findOne({ _id: request.params.id }, { _id: 0, children: 1 })
        .populate({ path: "children", select: { _id: 0 } })
        .then(Child => {
            if (Child == null)
                throw new Error("Class not exists");
            else
                response.status(200).json(Child);
        }).catch(error => next(error))
}
exports.getClassTeacher = function (request, response, next) {
    ClassSchema.findOne({ _id: request.params.id }, { _id: 0, Supervisor: 1 })
        .populate({ path: "Supervisor", select: { _id: 0 } })
        .then(Child => {
            if (Child == null)
                throw new Error("Class not exists");
            else
                response.status(200).json(Child);
        }).catch(error => next(error))
}