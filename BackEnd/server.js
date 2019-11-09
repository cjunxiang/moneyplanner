const express = require('express');
const app = express();

require('dotenv').config();

const path = require('path');
const logger = require('./logger');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const apiRouter = require('./api');
const bodyParser = require('body-parser');
const cors = require('cors');
const withAuth = require('./middleware');
const PORT = process.env.PORT;
let mongooseURL = process.env.MONGOOSE_PATH;

app.listen(PORT, error => {
  if (error) {
    logger.error(`Error ${error} has occurred when starting the server.`);
  }
  logger.info(`Server running on ${PORT}`);
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../FrontEnd/my-app/build/index.html'));
});
app.get('/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});

/**
 * App.use
 */
app.use(express.json({ limit: 52428800 }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../FrontEnd/my-app/build')));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/api', apiRouter);

/**
 * Set up mongoDb
 */
mongoose.connect(mongooseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', function() {
  logger.info('MongoDB database connection established successfully');
});

module.exports = app;
