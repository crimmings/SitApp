var express = require('express');
var router = express.Router();

/*
* GET sitters listing
*/
router.get('/', function(req, res){
  res.send('respond with a resource');
});

/*
 * GET babysitter list
 */

// doing an HTTP GET to /users/babysitters will return JSON listing all of the sitters in the db
router.get('/babysitters', function(req, res) {
  var db = req.db;
  var collection = db.get('sitterlist');
  collection.find({}, {}, function (e, docs) {
    res.json(docs);
  });
});


/*
 * POST to addSitter
 */

// POST data (req.body) and insert it into 'sitterlist' collection in sitapp db.
// returns an empty string if it works, an error message if it doesn't.

router.post('/addsitter', function(req, res){
  var db = req.db;
  var collection = db.get('sitterlist');
  collection.insert(req.body, function(err, result){
    res.send(
        (err === null) ? { msg: ''} : {msg: err}
    );
  });
});

/*
 * PUT to updatesitter
 */
router.put('/updatesitter/:id', function(req,res){
  var db = req.db;
  var sitterToUpdate = req.params.id;
  var doc = {$set: req.body};
  var collection = db.get('sitterlist');
  collection.updateById(sitterToUpdate, doc, function(err, result){
    //console.log(sitterToUpdate, doc);
  res.send((result === 1) ? {msg: ''} : { msg:'error: ' + err});
  });
});


/*
 * DELETE to deletesitter
 */

router.delete('/deletesitter/:id', function(req, res){
  var db = req.db;
  var collection = db.get('sitterlist');
  var sitterToDelete = req.params.id;
  collection.removeById(sitterToDelete, function(err, result){
    res.send((result === 1) ? {msg: ''} : {msg: 'error: ' + err});
  });
});



module.exports = router;
