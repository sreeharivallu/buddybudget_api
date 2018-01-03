var finduser = require('../../db/finddocument');
const common = require('../../config');
var jwt    = require('jsonwebtoken');


exports.loginuser = (req,res, next) => {
	console.log(req.body);
	var reqBody = req.body;

	if(reqBody.username && reqBody.password){
		var result = finduser.finddocument(common.userCollection,{username:reqBody.username, password:reqBody.password});	

		result
		.then(resObj => {
			console.log('login resp is', resObj);
			if(resObj.length){

				var token = jwt.sign({username:reqBody.username}, common.secretToken,
						  {expiresIn: 1440}); // expires in 24 hours);

				return res.status(200).json({success: true,
				          message: 'Enjoy your token!',
				          token: token
				        });	
			}else{
				return res.status(200).json({success: false,
						message:"username/password didn't exist"});
			}
			
		})
		.catch(err => {
			console.log('login err is', err);
			return res.status(500).send(err);		
		})
	}else{
		return res.status(401).send({message:"Invalid Input"});
	}	
}
