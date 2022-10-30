const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const teacherSchema = new Schema({
    teacherid: String,
    teachername: String,
    subject: String
})
const Teacher = mongoose.model('Teacher', teacherSchema, 'teachercollection');
module.exports = Teacher;
