var finduser = require('../../db/finddocument');


exports.getuser = (req,res, next) => {
	console.log('---------------');	
	var result = finduser.finddocument('drivers');
    console.log('result is', result);
	result
	.then(resp => {console.log(resp);res.status(200).send(resp);}) 
	.catch(err => res.status(500).send(err));	
}
