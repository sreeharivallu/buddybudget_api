var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

//var port = process.


var dbstate = {
  db: null,
}

exports.connect = function(url, done) {
  if (dbstate.db) return done()
    
  MongoClient.connect( url || 'mongodb://mongo/pickmedb', function(err, db) {
    if (err) return done(err)
    dbstate.db = db
    done()
  })
}

exports.get = function() {
  return dbstate.db
}

exports.close = function(done) {
  if (dbstate.db) {
    dbstate.db.close(function(err, result) {
      dbstate.db = null
      dbstate.mode = null
      done(err)
    })
  }
}

exports.objId = function(id){
  return new ObjectID(id);  
}