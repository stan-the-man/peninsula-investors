var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MeetingMinutesSchema = new Schema({
    date: Date,
    minutes: String,
});

var Meeting = mongoose.model('Meeting_Minutes', MeetingMinutesSchema);
module.exports = Meeting;
