const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const { PosPrinter } = require("electron-pos-printer");

const host = "0.0.0.0";
const port = 8000;

// const upload = multer({
//   dest: "./uploads/",
// });

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}-${Date.now()}`);
  },
});
var upload = multer({ storage: storage });

app.set("Host", host);
app.set("Port", port);

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Expres App"));

app.post("/print", (req, res) => {
  const options = {
    preview: false,
    margin: "auto",
    copies: 1,
    printerName: "POS-59",
    timeOutPerLine: 1000,
    pageSize: "58mm", // page size
    silent: true,
    width: "180px",
  };
  try {
    PosPrinter.print(req.body, options).then((result) => {
      res.json({ status: "done", result: result });
    });
  } catch (e) {
    console.log(e);
  }
});

// Serve the uploaded files
app.use("/uploads", express.static("./uploads"));

// Handle image upload
app.post("/upload", upload.single("image"), (req, res) => {
  // The uploaded image is available as req.file
  const image = req.file;
  console.log(req);

  // Get the URL of the uploaded image
  const imageUrl = `uploads/${image.filename}`;

  // Send a response to the client
  res.send({
    success: true,
    message: "Image was uploaded successfully",
    url: imageUrl,
  });
});

module.exports = { app, server };
