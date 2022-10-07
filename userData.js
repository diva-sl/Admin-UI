const fs = require('fs')

// let mainSource = JSON.parse(fs.readFileSync('./userdata/mainDb.json').toString() || '{}')

let userData = JSON.parse(fs.readFileSync('./members.json').toString() || '{}');



var presentPage = 1;
var countOfPages = 0;
let countPerEachPage = 10;
let eachPageList;

var searchRecord;

let tempSearch;
let resUsersData;

const getPage = (pageno, size, search) => {

    let tempSearch = search.toLowerCase();
    let result = userData;

    if (tempSearch != "") {

        result = userData.filter((user) => {

            if (user.name.toLowerCase().includes(tempSearch) || user.email.toLowerCase().includes(tempSearch)) {

                return true;

            }

        });

    }


    return result.slice(((pageno - 1) * size), pageno * size);


};




const paginationSetup = () => {

    searchRecord = userData.filter(user => user["show"] == true);

    if (searchRecord.length > 0 || (tempSearch != "" && tempSearch != undefined)) {

        countOfPages = Math.ceil(searchRecord.length / countPerEachPage);

    } else {
        countOfPages = Math.ceil(Object.keys(userData).length / countPerEachPage);
    }

    return countOfPages;

}


const deleteUser = (id) => {


    resUsersData = userData.splice(userData.findIndex(user => user.id === id), 1);

}

const deleteAll = (ids) => {

    let userIds = ids.split(',');

    userIds.map(id => {

        userData.splice(userData.findIndex(user => user.id === id), 1)

    });
    return userIds.length;

}

const searchingUsers = (search) => {



    return searchRecord.length;

}


const searchInUsers = (search) => {

    tempSearch = search.toLowerCase();
    presentPage = 1;

    return userData.filter((user) => {

        if (tempSearch != "") {
            if (user.name.toLowerCase().includes(tempSearch) || user.email.toLowerCase().includes(tempSearch)

                ||
                user.role.toLowerCase().includes(tempSearch)) {

                user.show = true;
                return user;

            }
        }

        user.show = false;
        // return user;

    });



}



const selectUser = (index) => {

    userData.filter(user => {

        if (check == 'true') {

            if (value == user.id) {

                user.checked = true;
            }
        } else {
            if (value == user.id) {


                delete user.checked;
            }

        }

    });

    return check;

}


const selectAllUsers = (select) => {
    if (select == 'true') {
        resUsersData.filter(resUser => {
            userData.forEach(user => {
                if (resUser.id == user.id) {
                    user.checked = true;
                }
            });

        });

    } else {
        userData.forEach(user => {
            delete user.checked;
        })
    }
    return resUsersData.length;

}



const editUser = (value) => {

    return userData.find(user => {
        if (user.id == value) {
            user.edit = true;
            return user;
        }

    });
}

const updateUser = (id, userInfo) => {

    userData.map(user => {
        if (user.id == id) {
            user.name = userInfo.Name;
            user.email = userInfo.Email;
            user.role = userInfo.Role;
        }
    })

}


const checkData = (data) => {

    var pattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;;

    var result = pattern.test(data[1]) && (data[2] == 'admin' || data[2] == 'member');

    return result;
}



module.exports = {
    getPage,
    paginationSetup,
    searchingUsers,
    selectUser,
    selectAllUsers,
    editUser,
    updateUser,
    checkData,
    deleteUser,
    deleteAll

}