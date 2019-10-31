const express = require('express');
const logger = require('../logger/index.js');
const WalletDb = require('./Wallet.model');

const AddNewWalletToDatabase = async (req, res) => {
  logger.debug('testWalletFunction method started.');
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
      logger.error(err);
    } else {
      res.json(wallets);
    }
  });
};

const fetchWalletByWalletId = async (req, res) => {
  logger.debug('fetchWalletByWalletId method started.');
  WalletDb.findById(req.params.id, function(err, wallet) {
    res.json(wallet);
  });
};

//TODO: not done
const fetchAllWalletsByUserId = async (req, res) => {
  logger.debug('fetchAllWalletsByUserId method started.');
  WalletDb.findById(req.params.id, function(err, wallet) {
    res.json(wallet);
  });
};

const editWalletByWalletId = async (req, res) => {
  logger.debug('editWalletByWalletId method started.');
  WalletDb.findById(req.params.id, function(err, updatedWallet) {
    if (!updatedWallet) res.status(404).send('data is not found');
    else {
      updatedWallet.WalletName = req.body.WalletName;
      updatedWallet.UserId = req.body.UserId;
      updatedWallet.TargetSum = req.body.TargetSum;
      updatedWallet.TotalSum = req.body.TotalSum;
      updatedWallet.Currency = req.body.Currency;
      updatedWallet.Active = req.body.Active;
    }
    updatedWallet
      .save()
      .then(updatedWallet => {
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
  fetchWalletByWalletId,
  fetchAllWalletsByUserId,
  editWalletByWalletId,
  deleteWalletByWalletId
  // getWalletIdByWalletNameAndUserId,
};
