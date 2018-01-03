var finddoc = require('../../db/finddocument');


exports.getdriver = (req,res, next) => {
	console.log(req.body);	
	var result = finddoc.finddocument('drivers');

	result
	.then(resp => res.status(200).send(resp))
	.catch(err => res.status(500).send(err));	
}
