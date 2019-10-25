const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const logger = require('./app/logger/index.js');
const apiRouter = require('./app/api');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;

require('dotenv').config();

/**
 * Linking to Mongoose
 */
mongoose.connect('mongodb://127.0.0.1:27017/tmoneyplanner', {
  useNewUrlParser: true
});
const connection = mongoose.connection;
connection.once('open', function() {
  console.log('MongoDB database connection established successfully');
});
let WalletDb = require('./db/Wallet.model');
let EventDb = require('./db/Event.model');

app.use(express.json({ limit: 52428800 }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../FrontEnd/my-app/build')));
app.use('/api', apiRouter);
app.use(cors());
app.use(bodyParser.json());

// /**
//  * Database routing Set-up
//  */
// const moneyPlannerRoutes = express.Router();
// app.use('/moneyplanner', moneyPlannerRoutes);
// moneyPlannerRoutes.route('/').get(function(req, res) {
//   MoneyPlanner.find(function(err, todos) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.json(todos);
//     }
//   });
// });

// /**
//  * Database: getting Id of item
//  */
// moneyPlannerRoutes.route('/:id').get(function(req, res) {
//   let id = req.params.id;
//   MoneyPlanner.findById(id, function(err, todo) {
//     res.json(moneyplanner);
//   });
// });

// /**
//  * Database: adding item
//  */
// moneyPlannerRoutes.route('/add').post(function(req, res) {
//   let moneyplanner = new MoneyPlanner(req.body);
//   moneyplanner
//     .save()
//     .then(moneyplanner => {
//       res.status(200).json({ moneyplanner: 'moneyplanner added successfully' });
//     })
//     .catch(err => {
//       res.status(400).send('adding new moneyplanner failed');
//     });
// });

// /**
//  * Database: update item by id.
//  */
// moneyPlannerRoutes.route('/update/:id').post(function(req, res) {
//   MoneyPlanner.findById(req.params.id, function(err, todo) {
//     if (!moneyplanner) res.status(404).send('data is not found');
//     else moneyplanner.money_description = req.body.money_description;
//     moneyplanner.money_responsible = req.body.money_responsible;
//     moneyplanner.money_priority = req.body.money_priority;
//     moneyplanner.money_completed = req.body.money_completed;
//     moneyplanner
//       .save()
//       .then(moneyplanner => {
//         res.json('Todo updated!');
//       })
//       .catch(err => {
//         res.status(400).send('Update not possible');
//       });
//   });
// });

app.listen(PORT, error => {
  if (error) {
    logger.error(`Error ${error} has occurred when starting the server.`);
  }
  logger.info(`Server running on ${PORT}`);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../FrontEnd/my-app/build/index.html'));
});
