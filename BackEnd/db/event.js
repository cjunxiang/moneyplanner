/**
 * ROUTES: Wallet
 */
const express = require('express');
const WalletDb = require('./Wallet.model');

const testWalletFunction = () => {
  console.log('yes');
  return 'hello';
  // WalletDb.find(function(err, res) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.json(res);
  //   }
  // });
};

module.exports = {
  testWalletFunction
};
