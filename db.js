const mongoose = require("mongoose");
const connection_string = "mongodb://localhost:27017/";

function connect() {
    return mongoose.connect(connection_string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "orange-toolz",
    });
}

module.exports = { connect };
