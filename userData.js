const fs=require('fs')

let mainSource = JSON.parse(fs.readFileSync('./userdata/mainDb.json').toString() || '{}')

let userData = JSON.parse(fs.readFileSync('./userdata/members.json').toString() || '{}');



var presentPage=1;
var countOfPages = 0;
let countPerEachPage =10;
let eachPageList;

var searchRecord;

let tempSearch;
let selected;  


const loadPages = () =>{
    
    searchRecord = userData.filter(user=>user["show"] == true);
    

	var start = ((presentPage - 1) * countPerEachPage);
    var end = start + countPerEachPage;

    if(searchRecord.length > 0 || (tempSearch != "" && tempSearch != undefined)){

    eachPageList=searchRecord.slice(start,end);

    }else{

    eachPageList=userData.slice(start,end);
	

    }
return eachPageList;


}


const pageSetup = () => {
    
    searchRecord = userData.filter(user=>user["show"] == true);

    if(searchRecord.length > 0 || (tempSearch != "" && tempSearch != undefined)){

     countOfPages=Math.ceil(searchRecord.length / countPerEachPage);    
    
    }else{
          countOfPages=Math.ceil(Object.keys(userData).length / countPerEachPage);
     }
	return {countOfPages,presentPage};

}


const searchInUsers = (search) => {

 tempSearch = search.toLowerCase();
 presentPage = 1;
    
    return userData.filter((user) => {
     
    if(tempSearch != ""){
    if (user.name.toLowerCase().includes(tempSearch) || user.email.toLowerCase().includes(tempSearch)
       
       || user.role.toLowerCase().includes(tempSearch)){
       
          user.show=true;
        return user;

    }
}

    user.show = false;
      // return user;

});



}


const changePage = (index) => {

      if(index > 1){

        presentPage = index;
      }
       else if(index < countOfPages){
        
        presentPage = 1;
       
       }

return presentPage;
}



const navigatePage = (index) => {
     
     if(index <= countOfPages){
      if(index > presentPage){

        changePage(index);
      
      }else if(index < presentPage) {

        changePage(index);

      }
  }
    return presentPage;

}


const selectUser = (select) => {

    const [check,value] = select.split(',');
    

    userData.filter(user => {

        if(check == 'true'){

            if(value == user.id){
               
                user.checked = true;
            }
        }else{
             if(value == user.id){


            delete user.checked;
        }

        }

    });

return check;

}





const selectAll = (select) => {
     
    if(select == 'true'){
         selected = eachPageList; 
            selected.forEach(check => {
                userData.filter(user => {
                    if(check.id == user.id){
                        user.checked = true;
                    } 
                });

            });

    }else{
        userData.forEach(user => {
            delete user.checked;
        })
    }
    
    return selected;
      
}

const editUser = (value) => {

        return userData.find(user => {
              if(user.id == value){
               user.edit = true; 
               return user;
        }

    });
}


const saveUser = (value) => {
    
    var save = value[value.length-1];
    userData.map(user => {
        if(user.id == save){
            user.name = value[0];
            user.email = value[1];
            user.role = value[2];
        }
  })  

}

const checkData =(data) => {
    
    var pattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;; 
    
    var result = pattern.test(data[1]) && (data[2] == 'admin' || data[2]=='member');
    
     return result;
}

const deleteUser = (value) => {
      
    userData.map((user,idx) => {
            if(user.id == value){
            userData.splice(idx,1);
        }

      });   

}


const deleteAll = () => {
      
    let count = 0;

    for(var i=0;i<userData.length;i++){

        if(userData[i].hasOwnProperty('checked')){

            userData.splice(i,1);

            count +=1; 

            i--;          

        }
    }
   return count;

}
   



module.exports = {

		loadPages,
		pageSetup,
		searchInUsers,
        changePage,
        navigatePage,
        selectUser,
        selectAll,
        editUser,
        saveUser,
        checkData,
        deleteUser,
        deleteAll


		
}

 


// const getWholePages = (length)=> {

// return Math.ceil(length/10);

// }

// const getIndexRecord = (page) => {

// 	return (page -1)* 10;
// }

// const searchUsers = (search,users) => {

// 	let userSearch = search.toLowercase();
// 	return users.map((user) => {

// 		if(user.name.toLowercase().includes(userSearch) || user.email.toLowercase().includes(userSearch) || user.role.toLowercase().includes(userSearch)){

// 	       user.show = true;
// 	       return user;		
// 		} 
// 		user.show = false;
// 		return user;
// 	}) 
// }

// const userResponse = (users) => {
// 	return users.map(user => {
// 		user.selected = false;
// 		user.edit = false;
// 		user.show = true;
// 		return user;
// 	})
// }


// module.exports = {

// 	getWholePages,
// 	getIndexRecord,
// 	searchUsers,
// 	userResponse
// }



