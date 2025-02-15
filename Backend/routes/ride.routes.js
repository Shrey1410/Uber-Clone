const auth_middleware = require("../middlewares/auth.middleware")
const { body , query } = require("express-validator")
const ride_controller = require("../controllers/ride.controller")

module.exports = (app)=>{
    app.post('/ride/create',[auth_middleware.checkuserlogin,
        body('pickup').isString().isLength({min : 3}).withMessage('Pickup address must be provided'),
        body('destination').isString().isLength({min : 3}).withMessage('Destination address must be provided'),
        body('vechicleTypes').isString().isIn(['auto', 'car', 'motorcycle']).withMessage('Invalid vechicle type')
    ], ride_controller.createRide)

    app.post('/ride/get-fare', [auth_middleware.checkuserlogin, body('pickup').isString().isLength({min : 3}).withMessage('Pickup address must be provided'),
        body('dropoff').isString().isLength({min : 3}).withMessage('Destination address must be provided'),], ride_controller.givefare)

    app.post('/ride/confirm', 
        [auth_middleware.checkcaptainlogin,
        body('rideId').isMongoId().withMessage('Invalid ride id')],
        ride_controller.confirmRide
    )

    app.post('/ride/start',
        [auth_middleware.checkcaptainlogin,
        body('rideId').isMongoId().withMessage('Invalid ride id'),
        body('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP')],
        ride_controller.startRide
    )
    
    app.post('/ride/end',
        auth_middleware.checkcaptainlogin,
        body('rideId').isMongoId().withMessage('Invalid ride id'),
        ride_controller.endRide
    )
}