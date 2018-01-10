db = require('./db');

exports.finddocument = function(coll, query, projection){
	return new Promise((resolve, reject) => {

		dbConn = db.get();

		let collection = dbConn.collection(coll);

		//console.log('collection is', collection);
		collection.find(query,projection).toArray()
		.then(function(result){
			console.log(result);
			resolve(result);
		})	
		.catch(function(err){
			console.log(err);
			reject(err);
		}) 

	}) 


} 


exports.findAggregation = function(coll, query){
	return new Promise((resolve, reject) => {

		dbConn = db.get();

		let collection = dbConn.collection(coll);

		//console.log('collection is', collection);
		collection.aggregate(query).toArray()
		.then(function(result){
			console.log(result);
			resolve(result);
		})	
		.catch(function(err){
			console.log(err);
			reject(err);
		}) 

	})
}

exports.getObjId = function(id){
	return db.objId(id);
};