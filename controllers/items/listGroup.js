var findGroups = require('../../db/finddocument');
const crypto = require('crypto');
const common = require('../../config');


exports.listGroup = (req,res, next) => {
	
	var username = req.decoded.username;
    console.log('username in listGroup', username);
	if(username){
		//, {groupList: {$elemMatch: {partner: username}}}
		query = [{$match :{$or : [{username:username},
				 {groupList: {$elemMatch: {partner: username}}}]}},
				 {$unwind:"$groupList"},{$match:{"groupList.partner": username}},
				 { $group : { _id : "$_id", groupList : { $addToSet : "$groupList" }}}];
		//findGroups.finddocument(common.userCollection,{$or : [{username:username},{groupList: {$elemMatch: {partner: username}}}]})
		findGroups.findAggregation(common.userCollection,query)
		.then(Groups =>{
			console.log('Groups are', Groups);
			console.log('GroupList are',  Groups);

			// Check if the user has atleast one group
			let groupList = Groups.find(group => {return group.groupList});

			if(groupList){
				return res.status(200).json(Groups);	
			}else{
				return res.status(600).json({message: "groupList empty"});	
			}
			
		})
		.catch(err => {
			console.log('err is', err);
			return res.status(500).send(err)
		});	

	}else{
		return res.status(601).json({message:"Username not present in the request body"});
	}
}

//var listGroups = (username) => {
//	return findGroups.finddocument(common.userCollection,{username:username});
//}
