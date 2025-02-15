const mongoose = require('mongoose');
const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: 3
        },
        lastname: {
            type: String,
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase : true,
    },
    password : {
        type : String,
        required : true,
        minlength : 8,
        select : false
    },
    socketId : {
        type : String,
    },
    status : {
        type : String,
        enum : ["active", "inactive"],
        default : "inactive"
    },
    vehicle: {
        color : {
            type : String,
            required : true, 
            minlength : 3
        },
        plate : {
            type : String,
            required : true,
            minlength : 3
        },
        capacity : {
            type : Number,
            required : true,
            min : 1
        },
        vechiletypes : {
            type : String,
            required : true,
            enum : ['auto', 'car', 'motorcycle']
        }
    },
    location : {
        ltd : {
            type : Number
        },
        lng : {
            type : Number
        }
    }
}, {timestamps : true,  __v :false});

const Captain = mongoose.model('Captain', captainSchema);

module.exports = Captain;