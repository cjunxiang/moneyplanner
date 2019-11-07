const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserDb = require('./User.model');
const logger = require('../logger/index.js');
require('dotenv').config();
const AddNewUserToDatabase = async (req, res) => {
  logger.debug('AddNewUserToDatabase method started.');
  const { email, password } = req.body;
  const newUser = new UserDb({ email, password });
  newUser.save(err => {
    if (err) {
      res.status(500).send(`Failed to register new user: ${err}`);
    } else {
      res.status(200).send('Account Created Successfully');
    }
  });
};

const AuthenticateUser = async (req, res) => {
  logger.debug('AddNewUserToDatabase method started.');
  const { email, password } = req.body;
  UserDb.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: 'Internal error please try again'
      });
    } else if (!user) {
      res.status(401).json({
        error: 'Incorrect email or password'
      });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500).json({
            error: 'Internal error please try again'
          });
        } else if (!same) {
          res.status(401).json({
            error: 'Incorrect email or password'
          });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, process.env.AUTH_SECRET, {
            expiresIn: '1h'
          });
          res.cookie('token', token, { httpOnly: true }).sendStatus(200);
        }
      });
    }
  });
};

module.exports = { AddNewUserToDatabase, AuthenticateUser };
