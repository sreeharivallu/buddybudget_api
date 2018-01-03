var removeuser = require('../../db/deletedocument');


exports.deleteuser = (req,res, next) => {
	console.log(req.body);	
	var result = removeuser.deletedocument(req.body);

	result
	.then(resp => res.status(200).send(resp))
	.catch(err => res.status(500).send(err));	
}
