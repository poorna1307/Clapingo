require('dotenv').config();
const asyncHandler = require('express-async-handler');
const express = require('express');
const jwt = require('jsonwebtoken');
const Student = require('../schemas/studentSchema');
const studentAPI = express.Router();
studentAPI.use(express.json());
studentAPI.post('/studentlogin', asyncHandler(async (request, response) => {
    let studentObj = request.body;
    let tempStudent = await Student.findOne({ studentid: studentObj.studentid });
    console.log(tempStudent);
    if (tempStudent === null) {
        response.send({ message: "Invalid users" })
    }
    else {
        // const status=await bcrypt.compare(userObj.password,tempUser.password)
        if (tempStudent.password != studentObj.password) {
            response.send({ message: "Invalid password" })
        }
        else {
            let token = jwt.sign({ studentid: studentObj.studentid }, "abcdef", { expiresIn: 120 });
            response.send({ message: "Login success", payload: token, studentData: tempStudent });
        }
    }
}));

studentAPI.put('/update-fav', asyncHandler(async (request, response) => {
    let { teacherid, studentid } = request.body
    console.log(teacherid, studentid);
    let studentObj = await Student.findOne({ studentid: studentid });
    studentObj.favoriteteacher.push(teacherid)
    await Student.updateOne({ studentid: studentid }, { $set: { favoriteteacher: studentObj.favoriteteacher } })
    response.send({ message: "Data updated..." })
}))

studentAPI.put('/remove-fav', asyncHandler(async (request, response) => {
    let { teacherid, studentid } = request.body
    console.log(teacherid, studentid);
    let studentObj = await Student.findOne({ studentid: studentid });
    console.log(studentObj);
    studentObj.favoriteteacher = studentObj.favoriteteacher.filter((favteacher) => favteacher !== teacherid)
    await Student.updateOne({ studentid: studentid }, { $set: { favoriteteacher: studentObj.favoriteteacher } })
    response.send({ message: "Data updated..." })
}))



module.exports = studentAPI;
