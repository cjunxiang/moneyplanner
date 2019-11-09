const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Wallet = new Schema({
  //Wallet_id
  WalletName: {
    type: String
  },
  UserId: {
    type: Number
  },
  TargetSum: {
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
