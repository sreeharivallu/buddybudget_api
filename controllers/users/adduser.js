var insertuser = require('../../db/insertdocument');



exports.adduser = (req,res, next) => {
	console.log(req.body);
	var data = req.body;

	console.log('req.body.password is' +  req.body.password);

	if(req.body.password){
		var salt = crypto.randomBytes(16).toString('hex');
		var hash = crypto.pbkdf2Sync(req.body.password, this.salt, 1000, 64).toString('hex');
		data.hash = hash;
	}

	console.log(data);	

	var result = insertuser.insertdocument(data);

	result.then(resp => res.status(200).send(resp))
	.catch(err => res.status(500).send(err));	
}
