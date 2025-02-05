const rideModel = require('../models/ride.model');
const mapsservice = require('./maps.services');
const crypto = require('crypto');

function getOtp(num){
    const otp = crypto.randomInt(Math.pow(10, num-1), Math.pow(10, num));
    return otp;
}

module.exports.createRide = async ({user, pickup, destination, vechicleTypes, fare}) =>{
    if(!user || !pickup || !destination || !vechicleTypes || !fare){
        throw new Error('user, pickup, destination and vechicleType are required')
    }
    const ride = await rideModel.create({
        userId : user,
        pickup : pickup,
        destination : destination,
        otp : getOtp(6),
        fare : fare
    })
    return ride;
}