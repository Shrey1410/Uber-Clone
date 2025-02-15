const maps = require("../services/maps.services");
const { validationResult } = require("express-validator");

module.exports.getcoordinates = async (req, res) => {
    // This api is being used by the user
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    const { address } = req.query;
    try {
        const location = await maps.getlatandlong(address);
        return res.status(200).json(location);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports.getdistance = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    if(!req.query.origin || !req.query.destination){
        return res.status(400).json({ message: "Origin and destination must be provided" });
    }
    const { origin, destination } = req.query;
    try {
        const distance_time = await maps.getDistance(destination, origin);
        return res.status(200).json(distance_time);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports.getsuggestions = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    const { input } = req.query;
    try {
        const suggestions = await maps.getautocomplete(input);
        return res.status(200).json(suggestions);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}