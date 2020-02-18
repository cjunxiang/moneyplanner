const express = require("express");
const logger = require("../logger/index.js");
const EventDb = require("./Event.model.js");
const WalletDb = require("./Wallet.model");

const AddNewEventToDatabase = async (req, res) => {
  logger.debug("AddNewEvent method started.");
  let newEvent = new EventDb(req.body);
  newEvent
    .save()
    .then(newEvent => {
      res.status(200).json({ newEvent: "newEvent added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new newEvent failed");
    });
};

const fetchAllEvents = async (req, res) => {
  EventDb.find(function(err, events) {
    if (err) {
      logger.error(err);
    } else {
      res.json(events);
    }
  });
};

const fetchEventByEventId = async (req, res) => {
  logger.debug("fetchEventByEventId method started.");
  EventDB.findById(req.params.id, function(err, event) {
    res.json(event);
  });
};
//TODO: not done, needs filtering;; find efficient method
const fetchAllEventByWalletId = async (req, res) => {
  const walletId = req.params.id;
  EventDb.find({ WalletId: walletId }, function(err, events) {
    if (err) {
      logger.error(err);
    } else {
      res.json(events);
    }
  });
};

const editEventByEventId = async (req, res) => {
  logger.debug("editEventByEventId method started.");
  EventDb.findById(req.params.id, function(err, updatedEvent) {
    if (!updatedEvent) res.status(404).send("data is not found");
    else {
      updatedEvent.WalletId = req.body.WalletId;
      updatedEvent.Type = req.body.Type;
      updatedEvent.Name = req.body.Name;
      updatedEvent.Price = req.body.Price;
      updatedEvent.Date = req.body.Date;
      updatedEvent.Remarks = req.body.Remarks;
    }
    updatedEvent
      .save()
      .then(updatedEvent => {
        res.json("updatedEvent editted!");
      })
      .catch(err => {
        res.status(400).send("Event update not possible");
      });
  });
};

const deleteEventByEventId = async (req, res) => {
  logger.debug("deleteEventByEventId method started.");
  EventDb.findByIdAndRemove(req.params.id, function(err, event) {
    if (!event) res.status(404).send("data is not found");
    else {
      res.json("Event deleted!");
    }
  });
};

module.exports = {
  AddNewEventToDatabase,
  fetchAllEvents,
  fetchEventByEventId,
  fetchAllEventByWalletId,
  editEventByEventId,
  deleteEventByEventId
};
