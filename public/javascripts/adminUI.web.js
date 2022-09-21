
const GLOBAL_STATE = {};

function getState () {
    return GLOBAL_STATE.state;
}

function setState(newState) {
    GLOBAL_STATE.state = newState;
}



async function init(){
   const paginationData = await fetch('/api/pagination').then((res) => res.json());

    setState({
        currentPage:paginationData.presentPage, 
        users: await fetch('/api/loadUsersList').then((res) => res.json()),
        totalNoOfPages:paginationData.countOfPages,
    });
    const state  = getState();
    renderUsersTable(state.users);
    renderPagination(state.currentPage, state.totalNoOfPages);
}


function renderPagination(currentPage,totalNoOfPages){
    
    let numberedPageButtons = '';
   
    for (let i=1;i<=totalNoOfPages;i++){
        numberedPageButtons += `<a ${currentPage==i ? 'class="active"' : ''} onclick="onJumpPage(${i})">`+
        `${i}` +
        `</a>`;
    }

    const paginationHTML = ''+
        `<a ${currentPage==1 ? 'class="not-allowed"':''} onclick="onJumpPage(1)"> &laquo;</a>`+
        `<a ${currentPage==1 ? 'class="not-allowed"':'' } onclick="onPrevPage()"> &lsaquo;</a>`+
        `${numberedPageButtons}` +
        `<a ${currentPage==totalNoOfPages ? 'class="not-allowed"':''} onclick="onNextPage()"> &rsaquo;</a>`+
        `<a ${currentPage==totalNoOfPages ? 'class="not-allowed"':''} onclick="onJumpPage(${totalNoOfPages})"> &raquo;</a>`;

    document.getElementById('pagination').innerHTML=paginationHTML;
}


function onUserSelect() {
    global.state.users[index].checked = true | false;
    renderUsersTable(global.state.users);
}

function onAllUsersSelect() {

    global.state.users[for_allusers].checked = true | false;
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

function onJumpPage() {
    global.state = {users: api(userData, pageno), currentPage: pageno};
    renderUsersTable(global.state.users);
    renderPagination(global.state.currentPage, global.state.totalNoOfPages);
}

function renderUsersTable(usersData) {
  const usersTableDiv = document.getElementById('usersTableDiv');
  usersTableDiv.innerHTML = '<table class="table1" id="table">' +
      "<thead>" +
      "<tr>" +
      "<th><input type='checkbox' id='select-all' onclick='selectAll()'></th>" +
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

