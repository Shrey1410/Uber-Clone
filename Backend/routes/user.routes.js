const user_controllers = require("../controllers/user.controller") 
const auth_middleware = require("../middlewares/auth.middleware")
const { body } = require("express-validator")
module.exports = (app)=>{
    app.post("/user/register", [body('email').isEmail().withMessage('Invalid Email'), body('fullname.firstname').isLength({min : 3}).withMessage('FirstName must be of length 3'), body('password').isLength({min : 8}).withMessage('Password must be of atleast length 8')], user_controllers.register)

    app.post('/user/login', [body('email').isEmail().withMessage('Invalid Email'),body('password').isLength({min : 8}).withMessage('Password must be of atleast length 8')], user_controllers.login)

    app.post('/user/logout', [auth_middleware.checkuserlogin], user_controllers.logout)
}