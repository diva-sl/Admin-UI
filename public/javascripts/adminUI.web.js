
const GLOBAL_STATE = {};

function getState () {
    return GLOBAL_STATE.state;
}

function setState(newState) {
    GLOBAL_STATE.state = newState; 
}



async function init(){
    
    let {pageno,size} = queryParams();
    

    if(pageno == null){
        pageno = 1;
        size = 10;
    }   


    const paginationData = await fetch('/api/pagination').then((res) => res.json());

    setState({
        currentPage:pageno,
        users: await fetch(`/api/users?pageno=${pageno}&size=${size}`).then((res) => res.json()),
        totalNoOfPages:paginationData.countOfPages,
    });

    const state  = getState();

    renderUsersTable(state.users);
    renderPagination(state.currentPage, state.totalNoOfPages);
}


function renderPagination(currentPage,totalNoOfPages){
    
    let numberedPageButtons = '';
    
    for (let i=1;i<=totalNoOfPages;i++){
        numberedPageButtons += `<a ${currentPage==i ? 'class="active"' : ''} href="/admin.html?pageno=${i}&size=10">`+
        `${i}` +
        `</a>`;
    }
    const paginationHTML = ''+
    `<a ${currentPage==1 ? 'class="not-allowed"':''} href="/admin.html?pageno=1&size=10"> &laquo;</a>`+
    `<a ${currentPage==1 ? 'class="not-allowed"':'' } href="/admin.html?pageno=${-currentPage - 1}&size=10""> &lsaquo;</a>`+
    `${numberedPageButtons}` +
    `<a ${currentPage==totalNoOfPages ? 'class="not-allowed"':''} href="/admin.html?pageno=${+currentPage + 1}&size=10"> &rsaquo;</a>`+
    `<a ${currentPage==totalNoOfPages ? 'class="not-allowed"':''} href="/admin.html?pageno=${totalNoOfPages}&size=10)"> &raquo;</a>`;

    document.getElementById('pagination').innerHTML=paginationHTML;

}

function onJumpPage(pageno) {

 const pageNumber = fetch('/api/jumpPage?page='+pageno).then((res) => res.json());

    // setState({
    //      currentPage: pageno,

    //  });
    // console.log(pageNumber);
    // console.log(getState());
    init();
    const state  = getState();
    renderUsersTable(state.users);
    renderPagination(state.currentPage, state.totalNoOfPages);

}

function onUserSelect() {
    global.state.users[index].checked = true | false;
    renderUsersTable(global.state.users);
}

function onAllUsersSelect() {

    renderUsersTable(global.state.users);
}

function onDelete() {
    api(deleteUser, id)
    global.state = {currentPage:0, users: api(userData)};
    renderUsersTable(global.state.users);
    renderPagination(global.state.currentPage, global.state.totalNoOfPages);
}

function onDeleteAll() {
    api(deleteAllUser, id)
    global.state = {currentPage:0, users: api(userData)};
    renderUsersTable(global.state.users);
    renderPagination(global.state.currentPage, global.state.totalNoOfPages);
}

function onNextPage() {
    global.state = {users: api(userData, pageno), currentPage: +1};
    renderUsersTable(global.state.users);
    renderPagination(global.state.currentPage, global.state.totalNoOfPages);
}

function onPrevPage() {
    global.state = {users: api(userData, pageno), currentPage: -1};
    renderUsersTable(global.state.users);
    renderPagination(global.state.currentPage, global.state.totalNoOfPages);
}



function renderUsersTable(usersData) {
  const usersTableDiv = document.getElementById('usersTableDiv');
  usersTableDiv.innerHTML = '<table class="table1" id="table">' +
  "<thead>" +
  "<tr>" +
  "<th><input type='checkbox' id='select-all' onclick='onAllUsersSelect()'></th>" +
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
  return usersData.map((userData, idx) => {
      let html = `<tr ${userData.hasOwnProperty('checked') ? 'class="selected"' : ''}>` +
      `<td><input type="checkbox" ` +
      `       ${userData.hasOwnProperty('checked') ? 'checked="true"' : ''}` +
      `       value=${userData.id}` +
      `       onclick="selectUser(${idx + 1})"></td>` +
      `<td><input type='text' value ="${userData.name}"></td>` +
      `<td><input type='text' value ="${userData.email}"></td>` +
      `<td><input type='text' value ="${userData.role}"></td>` +
      `<td class="editDelete">` +
      `       <img id="edit" onclick="editUser(${idx + 1})" src="/images/pencil-square.svg"/>` +
      `       <img id="delete" onclick="deleteUser(${idx + 1})" src="/images/trash.svg"/>` +
      `</td>` +
      `</tr>`;

      return html;
  }).join('\n');
}

function queryParams(){

    return window.location.search.slice(1).split('&').reduce((obj, keyvalue)=> {
        const [k, v] = keyvalue.split('=');
        obj[k]= v;
        return obj;
    }, {});

}