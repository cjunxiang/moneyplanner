const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const ItemSchema = new Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   date: {
//     type: Date,
//     default: Date.now
//   }
// });

const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	}
});

const WalletSchema = new Schema({
	name: String,
	owner: String,
	currency: String,
	balance: Number,
	events: []
});

const EventSchema = new Schema({
	id: String,
	name: String,
	isCredit: Boolean,
	// isDebit: Boolean,
	type: String,
	amount: Number,
	date: { type: Date, default: Date.now },
	remarks: []
});

// module.exports = Item = mongoose.model('item', ItemSchema);