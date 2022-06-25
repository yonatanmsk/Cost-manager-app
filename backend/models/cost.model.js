const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Creating new item for adding to the user's list of
//items and set its properties
const costSchema = new Schema({
  costId: { type: String},
  userIdentifier: {type: String},
  description: { type: String},
  category: { type: String},
  sum: { type: Number},
  year: {type: Number},
  month: {type: String}
}, {
  timestamps: true,
});

//Save it as an object
const Cost = mongoose.model('Cost', costSchema);

module.exports = Cost;