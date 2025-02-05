const http = require("http")
const app = require('./app')
const server_config = require("./configs/server.config")
const server = http.createServer(app)
const { initializesocket } = require("./socket")
initializesocket(server)
server.listen(server_config.PORT, ()=>{
    console.log("Connected to server", server_config.PORT)
})