const express = require('express');
const router = express.Router();
const event = require('./db/event.js');
const wallet = require('./db/wallet.js');

router.post('/testroute', event.testWalletFunction);

/**
 * sample function for router.post
 */
// const populateAllCompanyNames = async (req, res) => {
//   logger.debug('populateAllCompanyNames method started.');
//   const restaurantList = await db.fetchAllFromRestaurantTable();
//   let uniqueCompanyList = [];
//   restaurantList.map(entry => {
//     if (uniqueCompanyList.indexOf(entry.company_name) === -1) {
//       uniqueCompanyList.push(entry.company_name);
//     }
//   });
//   res.send(uniqueCompanyList);
// };

module.exports = router;
