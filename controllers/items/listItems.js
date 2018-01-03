var findGroups = require('../../db/finddocument');
const common = require('../../config');


exports.listItems = (req,res, next) => {
	
	var username = req.decoded.username;
	var groupName = req.params.groupName;

	if(username){
		let query  = {$or : [{username:username},{groupList: {$elemMatch: {partner: username}}}], groupList:{$elemMatch: {groupName: groupName}}};
		findGroups.finddocument(common.userCollection,query, {username: 1, groupList:{$elemMatch:{groupName:groupName}}})
		.then(Groups =>{
			console.log('Groups are', Groups);
			console.log('GroupList are',  Groups[0].groupList);
			return res.status(200).json(Groups[0].groupList[0]);
		})
		.catch(err => res.status(500).send(err));	

	}else{
		return res.status(601).send("Username not present in the request body");
	}
}


//var listGroups = (username) => {
//	return findGroups.finddocument(common.userCollection,{username:username});
//}
