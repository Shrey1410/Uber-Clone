const mongoose = require('mongoose');
const rideSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true
    },
    captain : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Captain'
    },
    pickup: {
        type: String,
        required: true
    },
    vechileType : {
        type : String,
        enum : ["car", "auto", "motorcycle"],
        required : true,
    },
    destination: {
        type: String,
        required: true
    },
    fare : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        enum : ['pending', 'accepted', 'ongoing' ,'completed', 'cancelled'],
        default : 'pending'
    },
    duration : {
        type : Number
    },
    distance : {
        type : Number
    },
    paymentId : {
        type : String
    },
    orderId :{
        type : String
    },
    signature : {
        type : String
    },
    otp : {
        type : String,
        select : false,
        required : true
    }
},{timestamps : true,  __v :false});

module.exports = mongoose.model('Ride', rideSchema);