const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("../Models/Teachers");
const teacherSchema = mongoose.model("Teachers");
const bcrypt = require('bcrypt');

exports.login = function (request, response, next) {
    if (request.body.email == "_admin@admin.com" && request.body.password == "12345") {
        const token = jwt.sign({
            id: 1,
            role: "admin",
            userName: "_admin"
        }, "NurseryDB", { expiresIn: "1h" });

        response.status(200).json({ data: "OK", token })
    }
    else {
        teacherSchema.findOne({
            Email: request.body.Email
        })
            .then(user => {
                bcrypt.compare(request.body.Password, user.Password, function (err, res) {
                    if (res==true) {
                        const token = jwt.sign({
                            id: user._id,
                            role: "teacher"
                        }, "NurseryDB", { expiresIn: "1h" });
                        response.status(200).json({ data: "OK", token })
                    }
                    else {
                        next(err)
                    }
                });
            })
            .catch(error => next(error))
    }
}





