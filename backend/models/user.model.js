const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Creating new username with its properties when the user
//is doing register to the appliation, with all the necceary properties
const userSchema = new Schema({
  userName: { type: String},
  userId: {type: String},
  firstName: { type: String},
  lastName: { type: String},
  birthday: { type: String},
  maritalStatus: { type: String},
  userIdentifier: { type: String }
}, {
  timestamps: true,
});

//Save it as an object
const User = mongoose.model('User', userSchema);

module.exports = User;