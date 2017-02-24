var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RosterSchema = new Schema({
    username:   String,
    first:      String,
    last:       String
    address:    String,
    phone:      String,
    spouse:     String,
    email:      String,
    birthday:   String,
    password:   String,
    created:    Date,
    updated:    Date,
});

var User = mongoose.model('Roster', RosterSchema);
module.exports = User;
