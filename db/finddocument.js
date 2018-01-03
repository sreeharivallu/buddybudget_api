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


} /*function(object){
	//let db = null;

    //console.log('db get has', db.get());
	dbConn = db.get();

	let collection = dbConn.collection('users')

	//console.log('collection is', collection);
	collection.find().toArray()
	.then(function(result){
		console.log(result);
		return result;
	})	
	.catch(function(err){
		console.log(err);
		return err;
	}) 
	//.then((users) => users.insert(object))
	//.catch(err => {console.log(err)});

} */