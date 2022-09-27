const fs=require('fs')

// let mainSource = JSON.parse(fs.readFileSync('./userdata/mainDb.json').toString() || '{}')

let userData = JSON.parse(fs.readFileSync('./members.json').toString() || '{}');



var presentPage=1;
var countOfPages = 0;
let countPerEachPage =10;
let eachPageList;

var searchRecord;

let tempSearch;
let resUsersData;  

const getPage = (pageno, size) => {
    presentPage = pageno;
    resUsersData = userData.slice(((pageno - 1)*size),pageno * size); 
    return resUsersData;

};


const loadUsersPageList = () =>{

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


const paginationSetup = () => {

    searchRecord = userData.filter(user=>user["show"] == true);

    if(searchRecord.length > 0 || (tempSearch != "" && tempSearch != undefined)){

       countOfPages=Math.ceil(searchRecord.length / countPerEachPage);    

   }else{
      countOfPages=Math.ceil(Object.keys(userData).length / countPerEachPage);
  }
     
  return countOfPages;

}


const deleteUser = (id) => {

    resUsersData = userData.splice(userData.findIndex(user => user.id === id ),1);  

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


const jumpPage = (index) => {

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


const selectUser = (index) => {

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


const selectAllUsers = (select) => {
  if(select == 'true'){
    resUsersData.filter(resUser => { 
        userData.forEach(user => {
          if(resUser.id == user.id){
            user.checked = true;
        } 
    });

    });

}
else{
    userData.forEach(user => {
        delete user.checked;
    })
}
return resUsersData.length;

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

const deleteUser1 = (value) => {

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
    getPage,
    loadUsersPageList,
    paginationSetup,
    searchInUsers,
    jumpPage,
    navigatePage,
    selectUser,
    selectAll,
    selectAllUsers,
    editUser,
    saveUser,
    checkData,
    deleteUser,
    deleteAll

}





