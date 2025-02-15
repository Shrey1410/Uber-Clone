const mongoose = require("mongoose")
const user_schema = mongoose.Schema({
    fullname :{ 
        firstname:{
            type : String,
            required : true,
            minlength : 3,
        },
        lastname : {
            type : String
        },
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength : 8,
        select : false
    },
    socketId : {
        type : String,
    } 
},{timestamps : true,  __v :false})

module.exports = mongoose.model("User", user_schema)