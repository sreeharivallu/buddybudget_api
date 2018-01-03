var insertItem = require('../../db/updatedocument');
var findItems = require('../../db/finddocument');
var _ = require('underscore');
const common = require('../../config');


exports.addItem = (req,res, next) => {
	console.log(req.body);
	var data = req.body;

	if(data.username){
		
		//console.log(data);	
		let query  = {$or : [{username:data.username},{groupList: {$elemMatch: {partner: data.username}}}], groupList:{$elemMatch: {groupName: data.groupName}}};
		var result = insertItem.updatedocument(common.userCollection,query,{$push:{'groupList.$.itemList':data}});

		result.
		then(resp => {
			console.log('resp is', resp);
			if(resp.result.ok){
				return updateGroupAmountAndPartnerAmount(data.username,data.groupName);				
				//return listItems(data.username,data.groupName);
			}else{
				
			}
		})
		.then(items =>{
			console.log('items are', items);
			console.log('groupList are',  items[0].groupList[0]);
			//partnerAmount(items[0].groupList[0]);
			return res.status(200).json(items[0].groupList[0]);
		})

		.catch(err => {console.log(err);res.status(500).send(err)});	

	}else{
		return res.status(601).send("Username not present in the request body");
	}
}

var updateGroupAmountAndPartnerAmount = (username, groupName) => {
	return listItems(username, groupName)
	.then(group =>{
		let groupItemList = group[0].groupList[0].itemList;
		let groupAmount = 0;
		console.log('groupItemList is', groupItemList);
		for(let i=0;i<groupItemList.length;i++){
			groupAmount += groupItemList[i].priceperqty*groupItemList[i].quantity;
		}

	let partnerAmounts = getPartnerAmounts(groupItemList);	
	let query  = {$or : [{username:username},{groupList: {$elemMatch: {partner: username}}}], groupList:{$elemMatch: {groupName: groupName}}};
	return	insertItem.updatedocument(common.userCollection, query,{$set:{"groupList.$.groupAmount": groupAmount, "groupList.$.partnerAmounts":partnerAmounts}});
	})
	.then(updatedGroupAmount => {
		return listItems(username,groupName);
	})
}

/*var partnerAmount = (groupItemList)=> {
	let itemList = groupItemList.itemList;
	let partnerAmounts = [];

    partnerAmounts = _.groupBy(itemList, (items) => {
    	return items.username;
    });
	
	console.log('partnerAmounts are', partnerAmounts);
}*/

var getPartnerAmounts = (groupItemList) => {
	let itemList = groupItemList;
	let partnerAmounts = [];

	var sum = function(t, n) { console.log('n is', n);return t + n; };

	console.log('itemList is', itemList);
	let groupedPartnerData = _.mapObject(
	    _.groupBy(itemList, 'username'),
	    function(values, username) {	    	
	        return {
	           amount: _.reduce(_.map(values, function(value){	            	
	            	return value.priceperqty*value.quantity}), sum, 0)
	        }
	    }
	);

	console.log('groupedPartnerData is', groupedPartnerData);
	Object.keys(groupedPartnerData).forEach(key =>{
		let partnerData = {};
		partnerData.partnername = key;
		partnerData.partnerAmount = groupedPartnerData[key].amount;
		partnerAmounts.push(partnerData);

	})
	console.log('partnerAmounts is', partnerAmounts);
	return partnerAmounts;
}


var listItems = (username,groupName) => {
	let query  = {$or : [{username:username},{groupList: {$elemMatch: {partner: username}}}], groupList:{$elemMatch: {groupName: groupName}}};
		return findItems.finddocument(common.userCollection,
		 						  query,
		 						  {username: 1, groupList:{$elemMatch:{groupName:groupName}}});
}
