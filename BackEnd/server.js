const express = require('express');
const app = express();
const path = require('path');
const logger = require('./logger');
const mongoose = require('mongoose');
const apiRouter = require('./api');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;
app.listen(PORT, error => {
  if (error) {
    logger.error(`Error ${error} has occurred when starting the server.`);
  }
  logger.info(`Server running on ${PORT}`);
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../FrontEnd/my-app/build/index.html'));
});

/**
 * App.use
 */
app.use(express.json({ limit: 52428800 }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../FrontEnd/my-app/build')));
app.use(cors());
app.use(bodyParser.json());
app.use('/api', apiRouter);

/**
 * Set up mongoDb
 */
mongoose.connect('mongodb://127.0.0.1:27017/moneyplanner', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', function() {
  console.log('MongoDB database connection established successfully');
});

module.exports = app;
