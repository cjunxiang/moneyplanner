const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("useCreateIndex", true);

let Event = new Schema({
  WalletId: {
    type: String,
    required: true
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

module.exports = mongoose.model("Event", Event);
