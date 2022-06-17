  

function loadPageList(){

   
    const tbody = document.getElementById("users");

    fetch('/api/loadPage')
    .then(res => res.json())
    .then(pagelist =>{ 
           
        
        tbody.innerHTML="";

      // console.log(pagelist);  

      pagelist.forEach((user,idx) => {
         
      
        const row = document.createElement("tr");
        
        row.className=user.hasOwnProperty('checked') ? 'selected' : '' ;
        const check=document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.onclick=(() => selectUser(idx+1));
        const Name = document.createElement("td");
        const Email = document.createElement("td");
        const Role = document.createElement("td");
        const Action =document.createElement("td");
        Action.setAttribute("class","editDelete");
        checkbox.checked=user.hasOwnProperty('checked');
        checkbox.value=user.id;
        check.appendChild(checkbox);
        Name.innerHTML="<input type='text' value ="+ user.name +">";
        Email.innerHTML="<input type='text' value ="+ user.email +">";
        Role.innerHTML="<input type='text' value ="+ user.role +">";
        Action.innerHTML='<img id="save" onclick="editUser('+ (idx+1) +')" src="../images/pencil-square.svg"/><img id="delete" onclick="deleteUser('+(idx+1)+')" src="../images/trash.svg"/>';
        row.append(check,Name,Email,Role,Action);
        tbody.appendChild(row);

        });

});

  pageSetup();  
        
}


function pageSetup () {
     
    const pagination = document.getElementById("pagination");
     
     
    fetch('/api/pageSetup')
    .then(res => res.json())
    .then(({countOfPages,presentPage}) => {


          pagination.innerHTML = "";

           const firstPage = document.createElement("a");
           const previousPage = document.createElement("a");
           const nextPage = document.createElement("a");
           const lastPage = document.createElement("a");
       
            firstPage.innerHTML="&laquo;";
            previousPage.innerHTML="&lsaquo;";

           firstPage.className = presentPage == 1 ? 'not-allowed' : '';
           previousPage.className=presentPage == 1 ? 'not-allowed' : '';
           firstPage.onclick= (() => changePage(1));
           firstPage.innerHTML="&laquo;";
           previousPage.onclick=(() => navigatePage(presentPage -1));
           previousPage.innerHTML="&lsaquo;";

           pagination.append(firstPage,previousPage);
          
    for (let i=1;i<=countOfPages;i++){

            const page=document.createElement("a");
            page.className = presentPage==i ? 'active' : '';
            page.onclick=(() => changePage(i));
            page.innerHTML=i;
            pagination.append(page);
    }
            lastPage.className = presentPage == countOfPages ? 'not-allowed' : '';
            nextPage.className=presentPage == countOfPages ? 'not-allowed' : '';
              nextPage.innerHTML="&rsaquo;";
              lastPage.innerHTML="&raquo;";

          presentPage =Number(presentPage);

           nextPage.onclick=(() => navigatePage(presentPage+1));
           nextPage.innerHTML="&rsaquo;";
           lastPage.onclick=(() => changePage(countOfPages));
           lastPage.innerHTML="&raquo;"; 

           pagination.append(nextPage,lastPage);
          

}); 

}

function changePage (page) {
      
      fetch('/api/changePage?page='+page)
      .then(res => res.json())
      .then(page => {
        loadPageList();
     
      })    

}

function navigatePage (page) {

  fetch('/api/navigatePage?page='+page)
  .then(res => res.json())
  .then(page => {

      loadPageList();

  })
}

 
function searchUsers () {

   let searchValue  = document.getElementById('search').value;

    fetch('/api/searchInUsers?page=1&search='+searchValue)
    .then(res => res.json())
    .then(users =>  {

    loadPageList();
    
 });


}


function selectUser (index){
    
     let checkbox = document.querySelectorAll('input[type = "checkbox"]')[index];
     let row = document.querySelectorAll('tr');
     
   fetch('/api/selectUser?select='+[checkbox.checked,checkbox.value])
   .then(res => res.json())
   .then(check=> {
      
        row[index].className = check == 'true' ? 'selected' : ''; 

   })        

}



function selectAll () {

     let select = document.getElementById('select-all');
     let row = document.querySelectorAll('tr');
     let checkboxs = document.querySelectorAll('input[type = "checkbox"]');

     fetch('/api/selectAll?select='+select.checked)
     .then(res => res.json())
     .then(check => {
      for(var i=1; i<=check.length;i++ ){
           checkboxs[i].checked = select.checked;
           row[i].className = select.checked ? 'selected' : '';
          }

      })

}

function editUser (index) {
    
    let user = document.querySelectorAll('input[type = "text"]');
    let row = document.querySelectorAll('tr');
    console.log(row);
    
     fetch('/api/editUser?user='+user.value)
     .then(res => res.json())
     .then(user => {

  
     })

}




function deleteUser (index) {
       
      var x = document.getElementById("snackbar");
     
      let user = document.querySelectorAll('input[type = "checkbox"]')[index];

     fetch('/api/deleteUser?user='+user.value)
     .then(res => res.json()) 
     .then(message => {
      x.innerHTML = message;
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      loadPageList();
     })


}


function deleteAll () {
    
    var x = document.getElementById("snackbar");

    
    fetch('/api/deleteAll')
    .then(res => res.json())
    .then(record => {
      
      x.innerHTML = record != '0' ? record+' Records Was deleted' : 'No record selected';
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      document.getElementById('select-all').checked=false;
      loadPageList();
      
    })     
}





