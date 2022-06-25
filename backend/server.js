const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// creates a reference to the environment variables
require('dotenv').config();

// creates an app instance and the server port
const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.use(cors());
app.use(express.json());
mongoose.connect(uri);

// creates the connection to mongoDB
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// creates the variables which define the routes - REStful api
const costsRouter = require('./routes/costs');
const usersRouter = require('./routes/users');
const computesRouter = require('./routes/computes');

app.use('/costs', costsRouter);
app.use('/users', usersRouter);
app.use('/computes', computesRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});