var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var departmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

var Departments = mongoose.model('Department', departmentSchema);

module.exports =  Departments ;