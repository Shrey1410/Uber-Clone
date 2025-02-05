const user_model = require("../models/user.model")
const {validationResult} = require("express-validator")
const bcrypt = require("bcrypt")
const security_config = require("../configs/security.config")
const jwt = require("jsonwebtoken")
module.exports.register = async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({errors : errors.array()
        })
    }
    const {fullname, email, password} = req.body
    if(!fullname.firstname || !email || !password){
        return res.status(400).send({
            message : "All field are required"
        })
    }
    const user1 = await user_model.findOne({email : email})
    if(user1){
        return res.status(400).send({
            message : "User already exists"
        })
    }
    const user = await user_model.create({
        fullname : {firstname : fullname.firstname, lastname : fullname.lastname},
        password : bcrypt.hashSync(password, security_config.SALT),
        email : email
    })
    if(!user){
        return res.status(500).send({
            message : "Error while registration!"
        })
    }
    const token = jwt.sign({
        user_id : user._id
    }, security_config.SECRETE_KEY, {expiresIn : '1h'})
    const option = {
        httpOnly: true,
        secure: true,
        sameSite : 'None',
        maxAge : 1*60*60*1000
    };
    return res.cookie("token", token, option).status(200).send([{
        _id : user._id,
        fullname : user.fullname,
        email : user.email
    }, {
        message : "User Registered successfully"
    }])
}
module.exports.login = async (req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).send({
            errors : errors.array()
        })
    }
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).send({
            message : "All fields are required"
        })
    }
    const user = await user_model.findOne({email : email}).select("+password")
    if(!user){
        console.log("entered")
        return res.status(400).send({
            message : "User not found"
        })
    }
    if(!bcrypt.compareSync(password, user.password)){
        return res.status(400).send({
            message : "Invalid credentials"
        })
    }
    const token = jwt.sign({
        user_id : user._id
    },security_config.SECRETE_KEY, {expiresIn : '30d'})
    const option = {
        httpOnly: true,
        secure: true,
        sameSite : 'None',
        maxAge : 1*60*60*1000
    };
    return res.cookie("token", token, option).status(200).send([{
        _id : user._id,
        fullname : user.fullname,
        email : user.email
    },{
        message : "User Logged In Successfully",
    }])
}
module.exports.logout = async (req, res)=>{
    return res.clearCookie("token").status(200).send({
        message : "User logged out successfully"
    })
}
module.exports.profile = async (req, res)=>{
    return res.status(200).send(
        {user : req.user}
    )
}