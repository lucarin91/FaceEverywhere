var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  name: String,
  twitter: String
});

module.exports = mongoose.model('Users', TodoSchema);
