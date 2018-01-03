db = require('./db');

exports.insertdocument = function(coll,object){	

    return new Promise((resolve, reject) => {
    	
		dbConn = db.get();

		let collection = dbConn.collection(coll);		
		
		collection.insert(object)
		.then(result => resolve(result))	
		.catch(err => reject(err)); 	

    })
}