const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors');


const PORT = 3000
const api = require("./routes/api")

const app = express()
app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json())
app.use('/api', api)

app.get('/', function(req, res) {
    res.send("Hello From Server")
})

app.listen(PORT, function() {
    console.log("server running on port " + PORT)
})