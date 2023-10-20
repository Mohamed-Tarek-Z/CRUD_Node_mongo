var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        require: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    }
}, {
    timestamps: true
});

var Employees = mongoose.model('Employee', employeeSchema);

module.exports = Employees;