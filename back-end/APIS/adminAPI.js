require('dotenv').config();
const asyncHandler = require('express-async-handler');
const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../schemas/adminSchema');
const adminAPI = express.Router();
adminAPI.use(express.json());
adminAPI.post('/adminlogin', asyncHandler(async (request, response) => {
    adminObj = request.body;
    console.log(adminObj);
    let tempAdmin = await Admin.findOne({ adminid: adminObj.adminid });
    console.log(tempAdmin)
    if (tempAdmin === null) {
        response.send({ message: "Invalid users" })
    }
    else {
        // const status=await bcrypt.compare(userObj.password,tempUser.password)
        if (tempAdmin.password != adminObj.password) {
            response.send({ message: "Invalid password" })
        }
        else {
            let token = jwt.sign({ adminid: adminObj.adminid }, "abcdef", { expiresIn: 120 });
            response.send({ message: "Login success", payload: token, adminData: tempAdmin });
        }
    }
}));

module.exports = adminAPI;
