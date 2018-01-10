var insertGroup = require('../../db/updatedocument');
var findGroups = require('../../db/finddocument');
const crypto = require('crypto');
const common = require('../../config');


exports.addGroup = (req,res, next) => {
	console.log(req.decoded);
	var data = req.body;
	data.username = req.decoded.username;
	

	if(data.username){
		console.log(data);	
		data.groupTotal = 0;
		var result = insertGroup.updatedocument(common.userCollection,{username:data.username},{$push:{groupList:data}});

		result.
		then(resp => {
			//console.log('resp is', resp);
			if(resp.result.ok){
				return listGroups(data.username);				
			}else{
				
			}
		})
		.then(Groups =>{
			console.log('items are', Groups);
			console.log('itemsList are',  Groups);
			return res.status(200).json(Groups);
		})
		.catch(err => res.status(500).send(err));	

	}else{
		return res.status(601).send("Username not present in the request body");
	}
}


var listGroups = (username) => {
	//let query = {$or : [{username:username},{groupList: {$elemMatch: {partner: username}}}]};
	//let projection = {groupList: {$elemMatch: {partner: username}}};

	query = [{$match :{$or : [{username:username},
				 {groupList: {$elemMatch: {partner: username}}}]}},
				 {$unwind:"$groupList"},{$match:{"groupList.partner": username}},
				 { $group : { _id : "$_id", groupList : { $addToSet : "$groupList" }}}];
		
	return	findGroups.findAggregation(common.userCollection,query)
	//return findGroups.finddocument(common.userCollection,query, projection);
}
