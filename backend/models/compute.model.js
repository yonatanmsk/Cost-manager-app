const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Creating new Compute collection that saves the same
 //previous computaion when user search again  
const computeSchema = new Schema({
  user_identifier: {type: String, required: true, minlength: 2},
  sum: { type: Number, required: true, minlength: 1},
  year: { type: Number },
  month: { type: String }
}, {
  timestamps: true,
});

//Save it as an object
const Compute = mongoose.model('Compute', computeSchema);

module.exports = Compute;