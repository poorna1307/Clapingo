require('dotenv').config();
const asyncHandler = require('express-async-handler');
const express = require('express');
const jwt = require('jsonwebtoken');
const Teacher = require('../schemas/teacherSchema');
const teacherAPI = express.Router();
teacherAPI.use(express.json());

teacherAPI.get('/getteachers', asyncHandler(async (request, response) => {
    const payload = await Teacher.find();
    response.send({ message: "Data Fetched..", payload: payload })
}))

module.exports = teacherAPI;