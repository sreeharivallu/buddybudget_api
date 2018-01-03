var insertGroup = require('../../db/updatedocument');
var findGroups = require('../../db/finddocument');
const crypto = require('crypto');
const common = require('../../config');


exports.addGroup = (req,res, next) => {
	console.log(req.body);
	var data = req.body;

	console.log('req.body.password is' +  req.body.password);

	if(data.username){
		console.log(data);	
		data.groupTotal = 0;
		var result = insertGroup.updatedocument(common.userCollection,{username:data.username},{$push:{groupList:data}});

		result.
		then(resp => {
			console.log('resp is', resp);
			if(resp.result.ok){
				return listGroups(data.username);				
			}else{
				
			}
		})
		.then(Groups =>{
			console.log('items are', Groups);
			console.log('itemsList are',  Groups[0].groupList);
			return res.status(200).json(Groups[0].groupList);
		})
		.catch(err => res.status(500).send(err));	

	}else{
		return res.status(601).send("Username not present in the request body");
	}
}


var listGroups = (username) => {
	let query = {$or : [{username:username},{groupList: {$elemMatch: {partner: username}}}]};
	return findGroups.finddocument(common.userCollection,query);
}
