const mongoose = require("mongoose");

let connectionString = "mongodb://localhost:27017/usedcars";

mongoose
  .connect(process.env.MONGODB_URI || connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(function () {
    console.log("MongoDb Connection Successful..");
  })
  /// Windows Fallback
  .catch(function (err) {
    console.log("working");
    connectionString = "mongodb://127.0.0.1:27017/usedcars";
    mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  });

module.exports = {
  Car: require("./Car"),
  User: require("./User"),
  Massage: require("./Massage"),
};
