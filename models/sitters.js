var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Babysitter = new Schema({
    babysitter: String,
    phone: String,
    email: String
})


module.exports = mongoose.model("Babysitter", Babysitter);