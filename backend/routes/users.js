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

  const username = req.body.username;
  const user_id = req.body.user_id;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const birthday = req.body.birthday;
  const marital_status = req.body.marital_status;
  const user_identifier = uuidv4();

  // Creating a new user with its properties for saving in mongoDB
  const newUser = new User({
    username, user_id, first_name, last_name,
    birthday, marital_status, user_identifier
  });
 
  // Save user information to the collection in mongoDB for login option 
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Search after a specific user for fetching data 
router.route('/username/:username/userid/:userid').get((req, res) => {

  User.find({ 'username': req.params.username, 'userid': req.params.userid })
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;