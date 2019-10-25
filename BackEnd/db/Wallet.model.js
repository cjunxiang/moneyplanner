const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Wallet = new Schema({
  WalletName: {
    type: String
  },
  WalletId: {
    type: Number
  },
  UserId: {
    type: Number
  },
  TargetSum: {
    type: Number
  },
  TotalSum: {
    type: Number
  },
  Currency: {
    type: String
  },
  Active: {
    type: Boolean
  }
});

module.exports = mongoose.model('Wallet', Wallet);
