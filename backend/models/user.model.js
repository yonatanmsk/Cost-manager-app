const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Creating new username with its properties when the user
//is doing register to the appliation, with all the necceary properties
const userSchema = new Schema({
  username: { type: String},
  user_id: {type: String},
  first_name: { type: String},
  last_name: { type: String},
  birthday: { type: String},
  marital_status: { type: String},
  user_identifier: { type: String }
}, {
  timestamps: true,
});

//Save it as an object
const User = mongoose.model('User', userSchema);

module.exports = User;