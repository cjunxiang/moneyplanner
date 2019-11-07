const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

let Wallet = new Schema({
  //Wallet_id
  WalletName: {
    type: String,
    required: true,
    unique: true
  },
  UserId: {
    type: Number,
    required: true
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
