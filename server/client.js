const http = require("http");
const express = require("express");
const app = express();
const clientServer = http.createServer(app);
const bodyParser = require("body-parser");
const cors = require("cors");

const host = "0.0.0.0";
const port = 3000;

app.set("Host", host);
app.set("Port", port);

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client')))

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/client/index.html`)
});



module.exports = { app, clientServer };
