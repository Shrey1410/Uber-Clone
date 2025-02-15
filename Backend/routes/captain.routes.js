const captain_controllers = require("../controllers/captain.controller");
const auth_middleware = require("../middlewares/auth.middleware");
const { body } = require("express-validator");
module.exports = (app) => {
    app.post("/captain/register", [
        body('email').isEmail().withMessage('Invalid Email'),
        body('fullname.firstname').isLength({ min: 3 }).withMessage('FirstName must be of length 3'),
        body('password').isLength({ min: 8 }).withMessage('Password must be of at least length 8'),
        body('vehicle.color').isLength({min : 3}).withMessage('Color must be of at least length 3'),
        body('vehicle.plate').isLength({min : 8}).withMessage('Plate must be of at least length 8'),
        body('vehicle.capacity').isInt({min : 1}).withMessage('Capacity must be of at least 1'),
        body('vehicle.vechiletypes').isIn(['auto', 'car', 'motorcycle']).withMessage('Invalid vehicle'),
    ], captain_controllers.register)

    app.post("/captain/login", [
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').isLength({ min: 8 }).withMessage('Password must be of at least length 8'),
    ], captain_controllers.login)

    app.post("/captain/logout", [auth_middleware.checkcaptainlogin], captain_controllers.logout)
}