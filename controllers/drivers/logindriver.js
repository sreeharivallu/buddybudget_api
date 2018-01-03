var finddoc = require('../../db/finddocument');
const crypto = require('crypto');
const common = require('../../config');


exports.logindriver = (req,res, next) => {
	console.log(req.body);
	var hash = '';
	if(req.body.password){
		console.log('common.saltString', common.saltString);
		hash = crypto.pbkdf2Sync(req.body.password, common.saltString, 1000, 64, 'sha256').toString('hex');
	}


    reqObj = {username:req.body.username};
	var result = finddoc.finddocument('drivers', reqObj);

	result
	.then(resp => {console.log(resp); return res.status(200).send(resp)})
	.catch(err => res.status(500).send(err));	
}
