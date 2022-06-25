const router = require('express').Router();
let Computes = require('../models/compute.model');

// get all the collection of the Computes Object
router.route('/').get((req, res) => {
    Computes.find()
    .then(costs => res.json(costs))
    .catch(err => res.status(400).json('Error: ' + err));
});

// function that adds a new collection of computes with POST method
router.route('/add').post((req, res) => {
  const userIdentifier = req.body.userIdentifier;
  const sum = Number(req.body.sum);
  const year = req.body.year;
  const month = req.body.month;

  const newComputes = new Computes({
    userIdentifier,
    sum,
    year,
    month
  });

  newComputes.save() //save it to the DB
  .then(() => res.json('Computes added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;