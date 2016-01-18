/**
 * Created by crimmings on 1/17/16.
 */
/**
 * Created by crimmings on 1/14/16.
 */
var express = require('express');
var router = express.Router();

/** GET About Page
 *
 */

router.get('/', function(req, res) {
    res.render('About', {title: 'About SIT'});
});



module.exports = router;
