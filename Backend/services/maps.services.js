const axios = require("axios");
const { API_KEY } = require("../configs/maps.config");
const captain_model = require("../models/captain.model")
module.exports.getlatandlong =  async (address) => {
    const apiKey = API_KEY
    const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
    try {
        const response = await axios.get(url)
        if(response.data.status === 'OK'){
        const location = response.data.results[0].geometry.location
            return {
                ltd : location.lat,
                lng : location.lng
            }
        }
        else{
            throw new Error('Unable to fetch Coordinates')
        }
    } catch (error){
        console.error('Error fetching coordinates:', error);
        throw error;
    }
}

module.exports.getDistance = async (destination, origin) => {
    const apiKey= API_KEY
    const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    try {
        const response = await axios.get(url)
        if(response.data.status == 'OK'){
            return [response.data.rows[0].elements[0].distance, 
            response.data.rows[0].elements[0].duration]
        }
        else{
            throw new Error('Unable to fetch Distance')
        }
    }
    catch (error) {
        throw error;
    }
}

module.exports.getautocomplete = async (input) =>{
    if(!input){
        throw new Error('query is required')
    }
    const apiKey= API_KEY
    const url = `https://maps.gomaps.pro/maps/api/place/queryautocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
    try{
        const response = await axios.get(url);
        if(response.data.status === 'OK'){
            return response.data.predictions;
        }
        else{
            throw new Error('Unable to fetch suggestions')
        }
    }
    catch(err){
        throw err
    }
}

module.exports.getCaptainInTheRadius = async(ltd, lng, radius)=>{
    console.log(ltd, lng)
    const captains = await captain_model.find({
        location: {
            $geoWithin: {
                $centerSphere: [[ltd, lng], 500 / 6371]
            }
        }
    })
    return captains
}