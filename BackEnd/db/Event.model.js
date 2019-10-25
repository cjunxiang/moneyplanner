const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Event = new Schema({
  EventName: {
    type: String
  },
  EventId: {
    type: Number
  },
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
  }
});

module.exports = mongoose.model('Event', Event);
