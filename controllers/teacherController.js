const mongoose = require("mongoose")
require("../Models/Teachers")
const TeacherSchema = mongoose.model("Teachers")
const bcrypt = require('bcrypt');
const saltRounds = 5;

exports.getAllTeachers = function (request, response) {
    TeacherSchema.find({})
        .then(data => {
            response.status(200).json(data)
        })
        .catch(error => {
            console.log(error);
        })
}
exports.getTeacher = function (request, response, next) {
    TeacherSchema.findOne({ _id: request.params.id })
        .then(teacher => {
            if (teacher == null)
                throw new Error("teacher not exists");
            else
                response.status(200).json(teacher);
        }).catch(error => next(error))
}
exports.addTeacher = function (request, respsone, next) {
    bcrypt.hash(request.body.Password, saltRounds, (err, hash) => {
        let object = new TeacherSchema({
            _id: request.body.id,
            fullName: request.body.fullName,
            Password: hash,
            Email: request.body.Email,
            image: request.body.image
        });
        object.save()
            .then(data => {
                respsone.status(201).json({ data })
            })
            .catch(error => next(error))
    });
}
exports.UpdateTeacher = function (request, respsone, next) {
    if (request.body.id != request.decodedToken.id) {
        throw new Error("Not Authorized");
    }
    TeacherSchema.updateOne({
        _id: request.body.id
    }, {
        $set: {
            fullName: request.body.fullName,
            Password: request.body.Password,
            Email: request.body.Email,
            image: request.body.image
        }
    })
        .then(data => {
            respsone.status(200).json({ data: "Updated Successfully" });
        })
        .catch(error => next(error))
}
exports.DeleteTeacher = function (request, respsone, next) {
    TeacherSchema.deleteOne({
        _id: request.params.id
    })
        .then(data => {
            respsone.status(202).json({ data: "Deleted Successfully" });
        })
        .catch(error => next(error))
}

