const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

// Setup config environment
let port = process.env.PORT || 8080;

// create express app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
  app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', 'DELETE, POST, PUT, GET');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
  });
// Setup Mongo/Mongoose
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Made it here!"});
});
require('./app/routes/user.routes.js')(app);
require('./app/routes/food.routes.js')(app);
require('./app/routes/record.routes.js')(app);

// listen for requests
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});
