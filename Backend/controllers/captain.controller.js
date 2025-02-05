const captain_model = require("../models/captain.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const { SALT, SECRETE_KEY } = require("../configs/security.config");
const { validationResult } = require("express-validator");
module.exports.register = async (req, res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        console.log(error.array())
        return res.status(400).send({array : error.array()})
    }
    const {fullname, email, password, vehicle} = req.body;
    if(!fullname.firstname || !email || !password || !vehicle.color || !vehicle.plate || !vehicle.capacity || !vehicle.vechiletypes){
        return res.status(400).send({
            message : "All fields required"
        })
    }
    const ans = await captain_model.findOne({email : email})
    if(ans){
        return res.status(400).send({
            message : "User already exists!!"
        })
    }
    const captain = await captain_model.create({
        fullname : fullname ,
        email : email , 
        password : bcrypt.hashSync(password, SALT),
        vehicle : vehicle
    })
    if(!captain){
        return res.status(500).send({
            message : "Error while creating captain"
        })
    }
    const token = jwt.sign({
        captain_id : captain._id
    }, SECRETE_KEY, {
        expiresIn : '1h'
    })
    const option = {
        httpOnly: true,
        secure: true,
        sameSite : 'None',
        maxAge : 1*60*60*1000
    };
    return res.cookie("token", token, option).status(200).send([{
        _id : captain._id,
        fullname : fullname ,
        email : email ,
        vehicle : vehicle
    },{
        message : "Captain Registered successfully"
    }])
}

module.exports.login = async (req, res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).send({array : error.array()})
    }
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).send({
            message : "All fields required"
        })
    }
    const captain = await captain_model.findOne({email : email}).select("+password")
    if(!captain){
        return res.status(400).send({
            message : "User not found"
        })
    }
    const isMatch = await bcrypt.compare(password, captain.password)
    if(!isMatch){
        return res.status(400).send({
            message : "Invalid password"
        })
    }
    const token = jwt.sign({
        captain_id : captain._id
    }, SECRETE_KEY, {
        expiresIn : '1h'
    })
    const option = {
        httpOnly: true,
        secure: true,
        sameSite : 'None',
        maxAge : 1*60*60*1000
    };
    return res.cookie("token", token, option).status(200).send([{
        _id : captain._id,
        fullname : captain.fullname,
        email : captain.email ,
        vehicle : captain.vehicle
    }, {
        message : "Captain Logged in successfully"
    }])
}

module.exports.logout = (req, res)=>{
    res.clearCookie("token").status(200).send({
        message : "captain logged out successfully"
    })
}

module.exports.getprofile = async (req, res)=>{
    const captain = await captain_model.findOne(req.captain._id)
    if(!captain){
        return res.status(400).send({
            message : "captain not found"
        })
    }
    return res.status(200).send({
        captain : captain
    })
}