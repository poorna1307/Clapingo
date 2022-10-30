const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const studentSchema = new Schema({
    studentid: String,
    studentname: String,
    favoriteteacher: Array,
    password: String
})
const Student = mongoose.model('Student', studentSchema, 'studentcollection');
module.exports = Student;
