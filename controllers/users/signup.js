var insertdoc = require('../../db/insertdocument');
const crypto = require('crypto');
const common = require('../../config');


exports.signup = (req,res, next) => {
	console.log('req.body is', req.body);

	var data = req.body;

	console.log('req.body.password is' +  req.body.password);

	if(req.body.password){		
		//var salt = crypto.randomBytes(16).toString('hex');
		//console.log('salt is' + salt);		
		var hash = crypto.pbkdf2Sync(req.body.password, common.saltString, 1000, 64, 'sha256').toString('hex');
		data.hash = hash;
	}

	console.log(data);	

	var result = insertdoc.insertdocument(common.userCollection,data);

	result.then(resp => res.status(200).send(resp))
	.catch(err => res.status(500).send(err));	
}
