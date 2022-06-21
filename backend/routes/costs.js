const router = require('express').Router();
let Cost = require('../models/cost.model');
let Computes = require('../models/compute.model');
const { v4: uuidv4 } = require('uuid');

let tempCost = [];
let computeSum;

// get all the collection of the Cost Object
router.route('/').get((req, res) => {
  Cost.find()
    .then(costs => res.json(costs))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Post Cost & Update Compute if exsists
router.route('/add').post((req, res) => {
  const cost_id = uuidv4();
  const user_identifier = req.body.user_identifier;
  const description = req.body.description;
  const category = req.body.category;
  const sum = Number(req.body.sum);
  const year = req.body.year;
  const month = req.body.month;

  //Creating a new cost item for saving in mongoDB
  const newCost = new Cost({
    cost_id,
    user_identifier,
    description,
    category,
    sum,
    year,
    month
  });

  newCost.save()
    .then(() => res.json('Cost added!'))
    .catch(err => res.status(400).json('Error: ' + err));

  // updates computes collection which exists after adding an item   
  Computes.findOneAndUpdate({ 'year': year, 'month': month, 'user_identifier': user_identifier },
    { $inc: { 'sum' : sum } })
    .catch(err => res.status(400).json('Error: ' + err));
    
  // update compute collection which include the All properties too 
  Computes.findOneAndUpdate({ 'year': year, 'month': 'All', 'user_identifier': user_identifier },
    { $inc: { 'sum' : sum } })
    .catch(err => res.status(400).json('Error: ' + err));
});
// Post Cost & Update Compute if exsists

// Get Cost by Year, Month & user_identifier
router.route('/user_identifier/:user_identifier/year/:year/month/:month').get((req, res) => {
  
  //if the user want to see all costs in a year
  if (req.params.month === 'All') {

    Cost.find({ 'year': req.params.year, 'user_identifier': req.params.user_identifier })
      .then(cost => tempCost = cost)
      .catch(err => res.status(400).json('Error: ' + err));
  }
  else { //if he wants to see costs of a specific month
    Cost.find({ 'year': req.params.year, 'month': req.params.month, 'user_identifier': req.params.user_identifier })
      .then(cost => tempCost = cost)
      .catch(err => res.status(400).json('Error: ' + err));
  }

  Computes.findOne({ 'year': req.params.year, 'month': req.params.month, 'user_identifier': req.params.user_identifier })
    .then(computes => computeSum = computes);
 
    //if the computes collection doesnt exist 
  if (computeSum === null) {
    Computes.findOneAndDelete({ 'year': req.params.year, 'month': req.params.month, 'user_identifier': req.params.user_identifier })
    .then(computes => computeSum = computes);

    let sums = 0;
    tempCost.forEach(cost => sums += cost.sum);
    
    //creating the collection by its properties
    const user_identifier = req.params.user_identifier;
    const sum = sums;
    const year = req.params.year;
    const month = req.params.month;

    const newComputes = new Computes({
      user_identifier,
      sum,
      year,
      month
    });

    newComputes.save();
  }
//print to web browser for fetching data
  const data = [tempCost, computeSum];
  res.json(data);
});
// Get Cost by Year & Month

module.exports = router;