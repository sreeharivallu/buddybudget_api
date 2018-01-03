var updatedoc = require('../../db/updatedocument');


exports.updatedriver = (req,res, next) => {
	console.log(req.body);

	if(req.body.updatefield && req.body.updateto){
		console.log('=========================#########3', req.body.updatefield);
		console.log('=========================#########3sdfsd', req.body.updateto);
		var result = updatedoc.updatedocument(req.body.updatefield, req.body.updateto);

		result.then(resp => res.status(200).send(resp))		
		.catch(err => res.status(500).send(err));		
	}else{
		res.status(600).send("invalid input params");
	}	
	
}
