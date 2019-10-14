const express = require('express');
const router = express.Router();
const expenditure = require('./expenditure');

router.post('/allWallet', expenditure.fetchWalletListByUserName);

module.exports = router;
