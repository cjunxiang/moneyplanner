const express = require('express');
const logger = require('../logger/index.js');
const WalletDb = require('./Wallet.model');

const AddNewWalletToDatabase = async (req, res) => {
  logger.debug('testWalletFunction method started.');
  console.log(req.body);

  let newWallet = new WalletDb(req.body);
  newWallet
    .save()
    .then(newWallet => {
      res.status(200).json({ newWallet: 'newWallet added successfully' });
    })
    .catch(err => {
      res.status(400).send('adding new newWallet failed');
    });
};

const fetchAllWallets = async (req, res) => {
  logger.debug('fetchAllWallets method started.');
  WalletDb.find(function(err, wallets) {
    if (err) {
      console.log(err);
    } else {
      res.json(wallets);
    }
  });
};

const fetchAllWalletsByWalletId = async (req, res) => {
  logger.debug('fetchAllWalletsByWalletId method started.');
  console.log(req.body);
  WalletDb.findById(req.params.id, function(err, todo) {
    res.json(todo);
  });
};

//TODO: not done
const fetchAllWalletsByUserId = async (req, res) => {
  logger.debug('fetchAllWalletsByUserId method started.');
  console.log(req.body);
  WalletDb.findById(req.params.id, function(err, todo) {
    res.json(todo);
  });
};

const editWalletByWalletId = async (req, res) => {
  logger.debug('editWalletByWalletId method started.');
  WalletDb.findById(req.params.id, function(err, updatedWallet) {
    if (!updatedWallet) res.status(404).send('data is not found');
    else {
      updatedWallet.WalletName = req.body.todo_description;
      updatedWallet.UserId = req.body.todo_responsible;
      updatedWallet.TargetSum = req.body.todo_priority;
      updatedWallet.TotalSum = req.body.todo_completed;
      updatedWallet.Currency = req.body.Currency;
      updatedWallet.Active = req.body.Active;
    }
    updatedWallet
      .save()
      .then(todo => {
        res.json('updatedWallet editted!');
      })
      .catch(err => {
        res.status(400).send('Wallet update not possible');
      });
  });
};

const deleteWalletByWalletId = async (req, res) => {
  logger.debug('deleteWalletByWalletId method started.');
  WalletDb.findByIdAndRemove(req.params.id, function(err, wallet) {
    if (!wallet) res.status(404).send('data is not found');
    else {
      res.json('wallet deleted!');
    }
  });
};

module.exports = {
  AddNewWalletToDatabase,
  fetchAllWallets,
  fetchAllWalletsByWalletId,
  fetchAllWalletsByUserId,
  editWalletByWalletId,
  deleteWalletByWalletId
  // getWalletIdByWalletNameAndUserId,
};
