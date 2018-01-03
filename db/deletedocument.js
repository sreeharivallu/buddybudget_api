db = require('./db');

exports.deletedocument = function(coll,object){	

    return new Promise((resolve, reject) => {
    	
		dbConn = db.get();

		let collection = dbConn.collection(coll)
		
		collection.remove(object, {justone: true})
		.then(result => resolve(result))	
		.catch(err => reject(err)); 	

    })
}