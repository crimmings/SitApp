var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Mixed = Schema.Types.Mixed;
var ObjectId = Schema.Types.ObjectId;

var dbname = 'nodemailerdb';

var EmailSchema = new Schema({
    from: Mixed,
    to: Mixed,
    subject: String,
    msgid: {
        type: String,
        index: true
    },
    inReplyTo: String,
    thread: {
        type: ObjectId,
        index: true
    },
    created: {type: Date, default: Date.now}
});

mongoose.connect('mongodb://localhost/' + dbname);

module.exports = mongoose.model('Email', EmailSchema);












/*
var Babysitter = new Schema({
    babysitter: String,
    phone: String,
    email: String
})


module.exports = mongoose.model("Babysitter", Babysitter);
    */