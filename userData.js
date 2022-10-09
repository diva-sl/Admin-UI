const fs = require('fs')


let userData = JSON.parse(fs.readFileSync('./members.json').toString() || '{}');


let countPerEachPage = 10;

let result;

const getPage = (pageno, size, search) => {

    let tempSearch = search.toLowerCase();
     result = userData;

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

        return Math.ceil(result.length / countPerEachPage);

}


const deleteUser = (id) => {

    return userData.splice(userData.findIndex(user => user.id === id), 1);

}

const deleteAll = (ids) => {

    let userIds = ids.split(',');

    userIds.map(id => {

        userData.splice(userData.findIndex(user => user.id === id), 1)

    });
    return userIds.length;

}



const editUser = (value) => {

    return userData.find(user => {
        if (user.id == value) {
            user.edit = true;
            return user;
        }

    });
}

const updateUser = (id,userInfo) => {

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
    editUser,
    updateUser,
    checkData,
    deleteUser,
    deleteAll

}