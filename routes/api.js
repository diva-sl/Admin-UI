var express = require('express');
var router = express.Router();
const url = require('url');
const users = require('../userData');

/* GET users listing. */
router.get('/users', (req, res) => {
    const {
        pageno = 1, size = 10, search = ''
    } = req.query;
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(users.getPage(pageno, size, search)));
});


router.delete('/user/delete/:id', (req, res) => {

    res.writeHead(200, {

        'Content-Type': 'application/json'
    });

    users.deleteUser(req.params.id);


    res.end(JSON.stringify('User Record was deletetd'));

})

router.delete('/user/deleteAll/:ids', (req, res) => {

    res.writeHead(200, {
        'Content-Type': 'application/json'
    })

    res.end(JSON.stringify(users.deleteAll(req.params.ids)));

})



router.get('/pagination', (req, res) => {

    res.writeHead(200, {
        'Content-Type': 'application/json'
    })

    res.end(JSON.stringify(users.paginationSetup()));

});


router.post('/user/:id', (req, res) => {

    res.writeHead(200, {

        'Content-Type': 'application/json'
    });

    users.updateUser(req.params.id, req.body);
    
    res.end(JSON.stringify('ok'));

})


module.exports = router;