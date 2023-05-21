const mongoose = require("mongoose");
require("dotenv").config();

const connect = () => mongoose.connect(process.env.MONGO_URL);

module.exports = connect;

// require("dotenv").config();
// const mongoose = require("mongoose");

// async function connect() {
//   mongoose.set("strictQuery", false);
//   return mongoose.connect(process.env.DB_URL);
// }

// module.exports = connect;