var exports  = module.exports = {};

exports.secret= "vallu";
exports.saltString ="vallu";
exports.dbName = "buddybudget"//"budget";
exports.mongoUrl = process.env.DB_URI || process.env.DATABASE_URL || 
					"mongodb://sreeharivallu:12345678@ds139067.mlab.com:39067/" || "mongodb://localhost:27017/";
exports.userCollection = "users";
exports.secretToken = "vallu";
