const express = require('express');
const path = require('path');

require('dotenv').config();

const logger = require('./app/logger/index.js');
const apiRouter = require('./app/api');

const app = express();

app.use(express.json({ limit: 52428800 }));
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../FrontEnd/my-app/build')));
app.use('/api', apiRouter);

const port = 123.123;

app.listen(port, error => {
  if (error) {
    logger.error(`Error ${error} has occurred when starting the server.`);
  }
  logger.info(`Server running on ${port}`);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../FrontEnd/my-app/build/index.html'));
});
