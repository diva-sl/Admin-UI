var express = require('express');
var router = express.Router();
const url = require('url');
const users = require('../userData');

/* GET users listing. */
router.get('/users',(req, res) => {
  const {pageno = 1, size = 10} = req.query;
  res.writeHead(200,{
    'Content-Type':'application/json'
  });
  res.end(JSON.stringify(users.getPage(pageno,size))); 
});


router.get('/pagination',(req,res) => {

    res.writeHead(200,{
      'Content-Type':'application/json'
  })
    
    res.end(JSON.stringify(users.paginationSetup())); 

});


router.get('/searchInUsers',(req, res) => {

    res.writeHead(200,{
        'Content-Type':'application/json'
    });


    res.end(JSON.stringify(users.searchInUsers(req.query.search))); 
});



router.get('/navigatePage',(req,res) => {
   
    res.writeHead(200,{
        'Content-Type':'application/json'
    });


    res.end(JSON.stringify(users.navigatePage(req.query.page)));

})

router.get('/userSelect',(req,res) => {
  const {select , check} = req.query
console.log(select,check);
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    
    res.end(JSON.stringify(users.selectUser(select,check)));

})


router.get('/allUsersSelect',(req,res) => {
   
    res.writeHead(200,{
        'Content-Type':'application/json'
    });
    
    res.end(JSON.stringify(users.selectAllUsers(req.query.select)));

})


router.get('/editUser',(req,res) => {

  res.writeHead(200,{

    'Content-Type' : 'application/json'
});
  

  res.end(JSON.stringify(users.editUser(req.query.user)));

})

router.post('/saveUser',(req,res) => {

  if (users.checkData(req.body)){
      res.writeHead(200,{

        'Content-Type' : 'application/json'
    });
      users.saveUser(req.body)
      res.end(JSON.stringify('ok'));
  }else {
    res.end(JSON.stringify('invalid enteries...'));
}

})



router.get('/deleteUser',(req,res) => {

  res.writeHead(200,{

    'Content-Type' : 'application/json'
});
  
  users.deleteUser(req.query.user);
  
  res.end(JSON.stringify('User Record was deletetd'));

})
router.get('/deleteAll',(req,res) => {


  res.writeHead(200,{

    'Content-Type' : 'application/json'

})

  res.end(JSON.stringify(users.deleteAll()));
  
})


module.exports = router;