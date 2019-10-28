const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Event = new Schema({
  WalletId: {
    type: Number
  },
  InflowOrOutFlow: {
    type: Number
  },
  Type: {
    type: String
  },
  Name: {
    type: String
  },
  Price: {
    type: Number
  },
  Date: {
    type: Date
  },
  Remarks: {
    type: String
  }
});

module.exports = mongoose.model('Event', Event);
