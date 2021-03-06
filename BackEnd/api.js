const express = require("express");
const router = express.Router();
const event = require("./db/event.js");
const wallet = require("./db/wallet.js");
const user = require("./db/user.js");

/**
 * Event database Functions
 */
router.post("/event/addNewEventToDatabase", event.AddNewEventToDatabase);
router.post("/event/fetchAllEvents", event.fetchAllEvents);
router.post("/event/fetchEventByEventId/:id", event.fetchEventByEventId);
router.post(
  "/event/fetchAllEventByWalletId/:id",
  event.fetchAllEventByWalletId
);
router.post("/event/editEventByEventId/:id", event.editEventByEventId);
router.post("/event/deleteEventByEventId/:id", event.deleteEventByEventId);

/**
 * Wallet database Functions
 */
router.post("/wallet/addNewWalletToDatabase", wallet.AddNewWalletToDatabase);
router.post("/wallet/fetchAllWallets", wallet.fetchAllWallets);
router.post(
  "/wallet/fetchAllWalletByUserId/:id",
  wallet.fetchAllWalletsByUserId
);
router.post("/wallet/fetchWalletByWalletId/:id", wallet.fetchWalletByWalletId);
router.post(
  "/wallet/fetchAllWalletsByUserId/:id",
  wallet.fetchAllWalletsByUserId
);
router.post("/wallet/editWalletByWalletId/:id", wallet.editWalletByWalletId);
router.post(
  "/wallet/deleteWalletByWalletId/:id",
  wallet.deleteWalletByWalletId
);

/**
 * User database Functions
 */
router.post("/user/register", user.AddNewUserToDatabase);
router.post("/user/authenticate", user.AuthenticateUser);

module.exports = router;

//Below is for User
// addUserIntoDatabase,
// fetchUserByUserId,
// editUserByUserId,
// deleteUserByUserId,
// getUserIdByUserName,
