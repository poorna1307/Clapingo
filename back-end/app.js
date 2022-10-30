const express = require('express'); // express moudule returns a function
require('dotenv').config(); //import dotenv
const mongoose = require('mongoose');
const adminAPI = require('./APIS/adminAPI');
const app = express();
const cors = require('cors');
const studentAPI = require('./APIS/studentAPI');
const teacherAPI = require('./APIS/teacherAPI');
app.use(express.json())
app.use(cors());
const mongoUrl = "mongodb+srv://poorna_1307:chandu13@poorna.zv57ipv.mongodb.net/ClapingoDB?retryWrites=true&w=majority";
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
})
    .then(() => {
        console.log("connected to database...");
    })
    .catch((error) => {
        console.log("The error is", error);
    })
app.listen(5000, () => {
    console.log("server started..");
})
app.use('/admin-api', adminAPI);
app.use('/student-api', studentAPI);
app.use('/teacher-api', teacherAPI);