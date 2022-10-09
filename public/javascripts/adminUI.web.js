const GLOBAL_STATE = {};

function getState() {
    return GLOBAL_STATE.state;
}

function setState(newState) {
    GLOBAL_STATE.state = newState;
    return newState;
}


async function init() {

    const {
        pageno = 1, size = 10
    } = queryParams();

    setState({
        currentPage: pageno,
        users: await fetch(`/api/users?pageno=${pageno}&size=${size}`).then((res) => res.json()),
        totalNoOfPages: await fetch('/api/pagination').then((res) => res.json()),
        editingUsers: []
    });

    const state = getState();

    renderUsersTable(state.users);
    renderPagination(state.currentPage, state.totalNoOfPages);
}


function renderPagination(currentPage, totalNoOfPages) {

    let numberedPageButtons = '';

    for (let i = 1; i <= totalNoOfPages; i++) {
        numberedPageButtons += `<a ${currentPage==i ? 'class="active"' : ''} href="/admin.html?pageno=${i}&size=10">` +
            `${i}` +
            `</a>`;
    }
    const paginationHTML = '' +
        `<a ${currentPage==1 ? 'class="not-allowed"':''} href="/admin.html?pageno=1&size=10"> &laquo;</a>` +
        `<a ${currentPage==1 ? 'class="not-allowed"':'' } href="/admin.html?pageno=${-currentPage - 1}&size=10""> &lsaquo;</a>` +
        `${numberedPageButtons}` +
        `<a ${currentPage==totalNoOfPages ? 'class="not-allowed"':''} href="/admin.html?pageno=${+currentPage + 1}&size=10"> &rsaquo;</a>` +
        `<a ${currentPage==totalNoOfPages ? 'class="not-allowed"':''} href="/admin.html?pageno=${totalNoOfPages}&size=10)"> &raquo;</a>`;

    document.getElementById('pagination').innerHTML = paginationHTML;

}

async function onSearchingUsers() {

    const {
        pageno = 1, size = 10
    } = queryParams();

    let searchValue = document.getElementById('search').value


    const state = setState({
        ...getState(),
        users: await fetch(`/api/users?pageno=${pageno}&size=${size}&search=${searchValue}`).then((res) => res.json()),
    	totalNoOfPages : await fetch('/api/pagination').then((res) => res.json())
    	
    });
    renderUsersTable(state.users);
    renderPagination(state.currentPage, state.totalNoOfPages);
}


function onUserSelect(index) {
    if (GLOBAL_STATE.state.users[index].checked == undefined) {
        GLOBAL_STATE.state.users[index].checked = true;
    } else {
        delete GLOBAL_STATE.state.users[index].checked
    }
    renderUsersTable(GLOBAL_STATE.state.users);
}

function onAllUsersSelect() {
    GLOBAL_STATE.state.allUsersSelected = !GLOBAL_STATE.state.allUsersSelected;
    GLOBAL_STATE.state.users.map(user => {
        if (GLOBAL_STATE.state.allUsersSelected) {
            user.checked = true;
        } else {
            delete user.checked
        }
    });
    renderUsersTable(GLOBAL_STATE.state.users);
}

function onDelete(id) {

    const deletedUser = fetch(`/api/user/delete/${id}`, {
        method: 'DELETE'
    }).then((res) => res.json());

    init();
}

function onDeleteAll() {

    const userIds = [];

    GLOBAL_STATE.state.users.map((user) => {
        if (user.checked == true) {
            userIds.push(user.id);
        }
    });

    const deletedAllUser = fetch(`/api/user/deleteAll/${userIds}`, {
        method: 'DELETE'
    }).then((res) => res.json());

    init();
}

async function onUpdateUser(userId) {
    const name = document.getElementById('name-' + userId).value;
    const email = document.getElementById('email-' + userId).value;
    const role = document.getElementById('role-' + userId).value;
    await fetch(`/api/user/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'Name': name,
            'Email': email,
            'Role': role
        })

    }).then((res) => res.json());

   const state = {...getState()};
	state.editingUsers = state.editingUsers.filter(x => x != userId);
	state.users =[...state.users];
    const indexFn = user => user.id == userId;
    const userIndex = state.users.findIndex(indexFn);
    state.users[userIndex] = {...state.users[userIndex],name:name,email:email,role:role};
    setState(state);
    renderUsersTable(state.users);


}

function onEditUser(userId) {

    GLOBAL_STATE.state.editingUsers.push(JSON.stringify(userId));

    renderUsersTable(GLOBAL_STATE.state.users);

}



function renderUsersTable(usersData) {
    const allSelected = GLOBAL_STATE.state.allUsersSelected;
    const usersTableDiv = document.getElementById('usersTableDiv');
    usersTableDiv.innerHTML = '<table class="table1" id="table">' +
        "<thead>" +
        "<tr>" +
        `<th><input type='checkbox' id='select-all' onclick='onAllUsersSelect()' ${allSelected?'checked':''}></th>` +
        "<th>Name</th>" +
        "<th>Email</th>" +
        "<th>Role</th>" +
        "<th>Action</th>" +
        "</tr>" +
        "</thead>" +
        "<tbody id='usersTableBody'>" +
        "</tbody>" +
        '</table>';

    const usersTableBody = document.getElementById('usersTableBody');
    usersTableBody.innerHTML = renderUsersTBodyRows(usersData);

}


function renderUsersTBodyRows(usersData) {
    // const userSelected = GLOBAL_STATE.state.UserSelected;
    return usersData.map((userData, idx) => {

        const tableEdit = GLOBAL_STATE.state.editingUsers.includes(userData.id);

        let html = `<tr ${userData.hasOwnProperty('checked') ? 'class="selected"' : ''}>` +
            `<td><input type="checkbox" ` +
            `       ${userData.hasOwnProperty('checked') ? 'checked="true"' : ''}` +
            `       value=${userData.id}` +
            `       onclick="onUserSelect(${idx})"></td>` +
            `<td><input type='text' ${tableEdit ? 'class="edit"' :''} id="name-${userData.id}" value ="${userData.name}"></td>` +
            `<td><input type='text' ${tableEdit ? 'class="edit"' :''} id="email-${userData.id}" value ="${userData.email}"></td>` +
            `<td><input type='text' ${tableEdit ? 'class="edit"' :''} id="role-${userData.id}" value ="${userData.role}"></td>` +
            `<td class="editDelete">` +
            (!tableEdit ?
                `       <img id="edit" onclick="onEditUser(${userData.id})" src="/images/pencil-square.svg"/>` :
                ` 		<img id="save" onclick="onUpdateUser(${userData.id})" src="/images/save.svg"/>`) +
            `       <img id="delete" onclick="onDelete(${userData.id})" src="/images/trash.svg"/>` +
            `</td>` +
            `</tr>`;

        return html;
    }).join('\n');
}

function queryParams() {

    return window.location.search.slice(1).split('&').reduce((obj, keyvalue) => {
        const [k, v] = keyvalue.split('=');
        obj[k] = v;
        return obj;
    }, {});

}



// function onJumpPage(pageno) {

//     const pageNumber = fetch('/api/jumpPage?page=' + pageno).then((res) => res.json());

//     // setState({
//     //      currentPage: pageno,

//     //  });
//     // console.log(pageNumber);
//     // console.log(getState());
//     init();
//     const state = getState();
//     renderUsersTable(state.users);
//     renderPagination(state.currentPage, state.totalNoOfPages);

// }