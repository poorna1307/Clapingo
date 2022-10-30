const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const adminSchema = new Schema({
    adminid: String,
    password: String
})
const Admin = mongoose.model('Admin', adminSchema, 'admincollection');
module.exports = Admin;
