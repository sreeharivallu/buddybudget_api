var exports  = module.exports = {};

exports.secret= "vallu";
exports.saltString ="vallu";
exports.dbName = "budget";
exports.mongoUrl = process.env.DB_URI || "mongodb://localhost:27017/";
exports.userCollection = "users";
exports.secretToken = "vallu";