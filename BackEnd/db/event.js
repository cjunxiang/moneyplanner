/**
 * ROUTES: Wallet
 */
const express = require('express');
const logger = require('../logger/index.js');
const EventDb = require('./Event.model');

const AddNewEventToDatabase = async (req, res) => {
  logger.debug('AddNewEvent method started.');
  console.log(req.body);

  let newEvent = new EventDb(req.body);
  newEvent
    .save()
    .then(newEvent => {
      res.status(200).json({ newEvent: 'newEvent added successfully' });
    })
    .catch(err => {
      res.status(400).send('adding new newEvent failed');
    });
};
const fetchAllEvents = async (req, res) => {
  EventDb.find(function(err, events) {
    if (err) {
      console.log(err);
    } else {
      res.json(events);
    }
  });
};

module.exports = {
  AddNewEventToDatabase,
  fetchAllEvents
};
