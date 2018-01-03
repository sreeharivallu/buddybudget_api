db = require('./db');

exports.updatedocument = function(coll,queryobj, updateobj){	
    console.log('updateObj', updateobj);
    return new Promise((resolve, reject) => {
    	console.log('queryobj is', queryobj);
		dbConn = db.get();

		let collection = dbConn.collection(coll);
		
		console.log('updateobj is', updateobj);
		collection.update(queryobj, updateobj, {upsert:true})
		.then(result => resolve(result))	
		.catch(err => reject(err)); 	

    })
}