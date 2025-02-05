const auth_middleware = require("../middlewares/auth.middleware");
const { body } = require("express-validator");
const maps_controllers = require("../controllers/map.controller");
const {query} = require('express-validator')
module.exports = (app) => {
    app.get("/map/get-coordinates", [auth_middleware.checkuserlogin,
        query('address').isString().isLength({min : 3}).withMessage('Address must be provided')
    ], maps_controllers.getcoordinates)

    app.get("/map/get-distance", [auth_middleware.checkuserlogin,
        query('origin').isString().isLength({min : 3}).withMessage('Origin must be provided'),
        query('destination').isString().isLength({min : 3}).withMessage('Destination must be provided')
    ], maps_controllers.getdistance)

    app.get("/map/get-suggestions", [auth_middleware.checkuserlogin,
        query('input').isString().isLength({min : 0}).withMessage('Input must be provided')
    ], maps_controllers.getsuggestions)
}