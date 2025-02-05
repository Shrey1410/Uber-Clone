const rideService = require('../services/ride.services');
const { validationResult } = require('express-validator');
const mapsservice = require('../services/maps.services')
const { sndmessagetosocketid } = require("../socket");
const rideModel = require('../models/ride.model');
module.exports.createRide = async (req, res) => {
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            message: errors.array()[0].msg
        });
    }
    const { pickup, destination, vechicleTypes, fare } = req.body;
    try{
        const ride = await rideService.createRide({user : req.user._id, pickup, destination, vechicleTypes, fare});
        res.status(201).json({
            ride
        });
        const pickupcoordinates = await mapsservice.getlatandlong(pickup)
        const captainsinRadius = await mapsservice.getCaptainInTheRadius(pickupcoordinates.ltd, pickupcoordinates.lng, 10)
        ride.otp = null
        const ridewithuser = await rideModel.aggregate([
            {
                $match : {
                    _id : ride._id
                }
            },
            {
                $lookup : {
                    from : "users",
                    localField : "userId",
                    foreignField : "_id",
                    as : "userId"
                }
            }
        ])
        console.log("happdnjj")
        console.log(captainsinRadius)
        console.log(ridewithuser)
        captainsinRadius.map((captain)=>{
            sndmessagetosocketid(captain.socketId, {
                event: 'new-ride',
                data:  ridewithuser
            })
        })
    } catch(error){
        return res.status(400).json({
            message: error.message
        });
    }
}

module.exports.givefare= async (req, res) =>{
    const { pickup,dropoff } = req.body;
    if(!pickup || !dropoff){
            throw new Error('pickup and destination are required')
        }
        const distance_time = await mapsservice.getDistance(dropoff, pickup)
        if(!distance_time[0] || !distance_time[1]){
            return res.status(400).send({
                message : "Please Provide Correct Destination and Pickup Point"
            })
        }
        const fareRates = {
            auto: { distanceRate: 10, timeRate: 2 },
            car: { distanceRate: 15, timeRate: 3 },
            motorcycle: { distanceRate: 8, timeRate: 1.5 }
        }
        const fare = {
            auto: (distance_time[0].value/1000) * fareRates.auto.distanceRate + (distance_time[1].value/60)* fareRates.auto.timeRate,
    
            car: (distance_time[0].value/1000) * fareRates.car.distanceRate + (distance_time[1].value/60)* fareRates.car.timeRate,
    
            motorcycle: (distance_time[0].value/1000) * fareRates.motorcycle.distanceRate + (distance_time[1].value/60) * fareRates.motorcycle.timeRate,
        }
        return res.status(200).send(fare)
}

module.exports.confirmRide = async (req, res)=>{
    const { rideId } = req.body;
    try{
        const ride = await rideModel.findByIdAndUpdate(rideId, { captain : req.captain, status : 'accepted'})
        sndmessagetosocketid(ride.user.socketId, {
            event : 'confirm-ride',
            data : ride
        })
        return res.status(200).send(ride)
    }
    catch(error){
        return res.status(400).send({
            message : "Error Occured"
        })
    }
}

module.exports.startRide = async (req, res)=>{
    const { rideId, otp } = req.query
    try{
        const ride = await rideModel.findOne({
            _id: rideId
        }).populate('user').select('+otp');
        if(!ride){
            return res.status(400).send({
                message : "Ride Not Found"
            })
        }
        if(ride.status!='accepted'){
            return res.status(400).send({
                message : "Ride Not Accepted"
            })
        }
        if(ride.otp!=otp){
            return res.status(400).send({
                message : "Incorrect otp"
            })
        }
        await rideModel.findOneAndUpdate({
            _id: rideId
        }, {
            status: 'ongoing'
        })
        sndmessagetosocketid(ride.user.socketId, {
            event : 'start-ride',
            data : ride
        })
        return res.status(200).send(ride)
    }
    catch(error){
        return res.status(500).send({
            message : "Some Error occured"
        })
    }
}

module.exports.endRide = async (req, res)=>{
    const { rideId } = req.body
    try{
        const ride = await rideModel.findById(rideId)
        if(!ride){
            return res.status(400).send({
                message : "Ride not found"
            })
        }
        if(ride.status != 'ongoing'){
            return res.status(400).send({
                message : "Ride not ongoing"
            })
        }
        await rideModel.findOneAndUpdate({
            _id : rideId
        }, {
            status : 'completed'
        })
        sndmessagetosocketid(ride.user.socketId, {
            event : 'end-ride',
            data : ride
        })
        return res.status(200).send(ride)
    }
    catch(error){
        return res.status(400).send({
            message : "Error in completing Ride"
        })
    }
}