var findGroups = require('../../db/finddocument');
const crypto = require('crypto');
const common = require('../../config');


exports.listGroup = (req,res, next) => {
	
	var username = req.decoded.username;

	if(username){
		
		findGroups.finddocument(common.userCollection,{$or : [{username:username},{groupList: {$elemMatch: {partner: username}}}]}, {groupList: {$elemMatch: {partner: username}}})
		.then(Groups =>{
			console.log('Groups are', Groups);
			console.log('GroupList are',  Groups[0].groupList);
			return res.status(200).json(Groups[0].groupList);
		})
		.catch(err => res.status(500).send(err));	

	}else{
		return res.status(601).send("Username not present in the request body");
	}
}

//var listGroups = (username) => {
//	return findGroups.finddocument(common.userCollection,{username:username});
//}
