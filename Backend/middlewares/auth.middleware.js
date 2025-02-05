const jwt = require('jsonwebtoken')
const security_config = require('../configs/security.config')
const user_model = require('../models/user.model')
const captain_model = require('../models/captain.model')
module.exports.checkuserlogin = async (req, res, next)=>{
    const token = req.cookies.token
    if(!token){
        return res.status(401).send({
            message : "Unauthorized!"
        })
    }
    try{
        const decoded = jwt.verify(token, security_config.SECRETE_KEY)
        const user = await user_model.findOne({_id : decoded.user_id}) 
        req.user = user
        next()
    }
    catch(err){
        return res.status(400).send({
            message : "Error while authorization"
        })
    }
}

module.exports.checkcaptainlogin = async (req, res, next)=>{
    const token = req.cookies.token
    if(!token){
        return res.status(401).send({
            message : "Unauthorized!"
        })
    }
    try{
        const decoded = jwt.verify(token, security_config.SECRETE_KEY)
        const captain = await captain_model.findOne({_id : decoded.captain_id}) 
        req.captain = captain
        next()
    }
    catch(err){
        return res.status(400).send({
            message : "Error while authorization"
        })
    }
}