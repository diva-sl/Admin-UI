const getWholePages = (length)=> {

return Math.ceil(length/10);

}

const getIndexRecord = (page) => {

	return (page -1)* 10;
}

const searchUsers = (search,users) => {

	let userSearch = search.toLowercase();
	return users.map((user) => {

		if(user.name.toLowercase().includes(userSearch) || user.email.toLowercase().includes(userSearch) || user.role.toLowercase().includes(userSearch)){

	       user.show = true;
	       return user;		
		} 
		user.show = false;
		return user;
	}) 
}

const userResponse = (users) => {
	return users.map(user => {
		user.selected = false;
		user.edit = false;
		user.show = true;
		return user;
	})
}


module.exports = {

	getWholePages,
	getIndexRecord,
	searchUsers,
	userResponse
}