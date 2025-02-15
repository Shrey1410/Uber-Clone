const { Server } = require("socket.io")
const user_model = require("./models/user.model")
const captain_model = require("./models/captain.model")
const mongoose = require('mongoose')
let io;
function initializesocket(server){
    io = new Server(server, {
        cors : {
            origin : '*',
            methods : ['GET', 'POST']
        }
    })
    io.on('connection', (socket)=>{
        console.log("A user is connected with socketid : ", socket.id)
        socket.on("join", async (data) => {
            let { userId, userType } = data
            if(userType == 'user'){
                await user_model.findByIdAndUpdate(userId, {socketId : socket.id}, {new : true})
            }
            else if(userType == 'captain'){
                await captain_model.findByIdAndUpdate(userId, {socketId : socket.id})
            }
        })
        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;

            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }
            await captain_model.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            });
        });
        socket.on('disconnect', ()=>{
            console.log('disconnectd fromt the socket', socket.id)
        })
    })
}
function sndmessagetosocketid(socketId, messageObj){
    console.log(messageObj.data)
    if(io){ 
        console.log('in snd msg')
        console.log(socketId)
        console.log(messageObj.event, messageObj.data)
        io.to(socketId).emit(messageObj.event, messageObj.data)
    }
    else{
        console.log("Socket.Io is not initialized")
    }
}
module.exports = { initializesocket , sndmessagetosocketid }