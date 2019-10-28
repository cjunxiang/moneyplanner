const express = require('express');
const router = express.Router();
const event = require('./db/event.js');
const wallet = require('./db/wallet.js');

/**
 * Event database Functions
 */
router.post('/event/addNewEventToDatabase', event.AddNewEventToDatabase);
router.post('/event/fetchAllEvents', event.fetchAllEvents);
router.post('/wallet/fetchEventByEventId/:id', event.fetchEventByEventId);
router.post(
  '/wallet/fetchAllEventByWalletId/:id',
  event.fetchAllEventByWalletId
);
router.post('/wallet/editEventByEventId/:id', event.editEventByEventId);
router.post('/wallet/deleteEventByEventId/:id', event.deleteEventByEventId);

/**
 * Wallet database Functions
 */
router.post('/wallet/addNewWalletToDatabase', wallet.AddNewWalletToDatabase);
router.post('/wallet/fetchAllWallets', wallet.fetchAllWallets);
router.post('/wallet/fetchWalletByWalletId/:id', wallet.fetchWalletByWalletId);
router.post(
  '/wallet/fetchAllWalletsByUserId/:id',
  wallet.fetchAllWalletsByUserId
);
router.post('/wallet/editWalletByWalletId/:id', wallet.editWalletByWalletId);
router.post(
  '/wallet/deleteWalletByWalletId/:id',
  wallet.deleteWalletByWalletId
);

module.exports = router;

//Below is for User
// addUserIntoDatabase,
// fetchUserByUserId,
// editUserByUserId,
// deleteUserByUserId,
// getUserIdByUserName,
