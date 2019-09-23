const db = require('../database');

const fetchWalletListByUserName = async userName => {
  const userId = await db.getUserIdByUserName(userName);
  const walletList = await db.fetchWalletListByUserId(userId);
  return walletList;
};

module.exports = {
  fetchWalletListByUserName
};
