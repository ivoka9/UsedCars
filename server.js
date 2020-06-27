const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const db = require("./models");
const session = require("express-session");
const store = require("connect-mongo")(session);
const controllers = require("./controllers");
const socket = require("socket.io");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 4000;

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(
  session({
    store: new store({
      url: process.env.MONGODB_URI,
    }),
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
  })
);
app.use("/massage", controllers.massage);
app.use("/cars", controllers.car);
app.use("/", controllers.user);

const server = app.listen(PORT, function () {
  console.log(`Server is running on: ${PORT}`);
});

const io = socket(server);

io.sockets.on("connection", function (socket) {
  socket.on("msg", sendingData);

  function sendingData(data) {
    socket.broadcast.emit("msg", data);
  }
  console.log("socket connected");
  console.log(process.env.SOCKETCONN);
});
