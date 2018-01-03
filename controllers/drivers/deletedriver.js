var removedoc = require('../../db/deletedocument');


exports.deletedriver = (req,res, next) => {
	console.log(req.body);	
	var result = removedoc.deletedocument(req.body);

	result
	.then(resp => res.status(200).send(resp))
	.catch(err => res.status(500).send(err));	
}
