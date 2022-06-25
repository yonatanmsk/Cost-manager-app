const router = require('express').Router();
let User = require('../models/user.model');
const { v4: uuidv4 } = require('uuid');

// Get all the collection of the User Object
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Adding a new user by login method or register option 
router.route('/add').post((req, res) => {

  const userName = req.body.userName;
  const userId = req.body.userId;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const birthday = req.body.birthday;
  const maritalStatus = req.body.maritalStatus;
  const userIdentifier = uuidv4();

  // Creating a new user with its properties for saving in mongoDB
  const newUser = new User({
    userName, userId, firstName, lastName,
    birthday, maritalStatus, userIdentifier
  });
 
  // Save user information to the collection in mongoDB for login option 
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Search after a specific user for fetching data 
router.route('/userName/:userName/userId/:userId').get((req, res) => {

  User.find({ 'userName': req.params.userName, 'userId': req.params.userId })
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;