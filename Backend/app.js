const express = require("express")
const app = express()
const cors = require('cors')
const mongoose = require("mongoose")
const db_config = require("./configs/db.config")
const cookie = require("cookie-parser")
const cookieParser = require("cookie-parser")
mongoose.connect(db_config.URI)
const db = mongoose.connection
app.use(
    cors({
      origin : ['http://localhost:5173', 'https://370gk5ww-5173.inc1.devtunnels.ms',],
      credentials: true,              
    })
);
app.use(express.json())
app.use(express.urlencoded())
app.use(cookie())
app.use(cookieParser())
db.on("error", ()=>{
    console.log("Error while connecting")
})
db.once("open", ()=>{
    console.log("Connected to database successfully!!!")
})
require("./routes/user.routes")(app)
require("./routes/captain.routes")(app)
require("./routes/maps.routes")(app)
require("./routes/ride.routes")(app)

module.exports = app