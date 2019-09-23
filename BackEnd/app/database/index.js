const request = require('request');
const logger = require('../logger');

require('dotenv').config();

const databaseURL = 192.168;

/**
 * @param UserId
 * @param WalletDetails={Name, Currency, Target, InitialSum}
 * @returns Echo of object added
 */
const fetchWalletListByUserId = UserId => {
  logger.debug('fetchWalletListByUserId method started.');
  return new Promise((resolve, reject) => {
    request.post(
      `${databaseURL}/wallet/add-wallet-by-user-id`,
      {
        json: {
          UserId: UserId
        }
      },
      (error, res, body) => {
        if (error) {
          logger.error(
            `Error ${error} occurred when fetching walletList from UserID ${UserId}`
          );
          reject();
        }
        resolve(body);
      }
    );
  });
};

/**
 * @param UserId
 * @param WalletDetails={Name, Currency, Target, InitialSum}
 * @returns Echo of object added
 */
const addWalletByUserId = (UserId, WalletDetails) => {
  logger.debug('addWalletByUserId method started.');
  return new Promise((resolve, reject) => {
    request.post(
      `${databaseURL}/wallet/add-wallet-by-user-id`,
      {
        json: {
          UserId: UserId,
          WalletName: WalletDetails.name,
          Currency: WalletDetails.currency,
          TotalSum: WalletDetails.InitialSum,
          TargetSum: WalletDetails.TargetSum
        }
      },
      (error, res, body) => {
        if (error) {
          logger.error(
            `Error ${error} occurred when adding new Wallet into UserID ${UserId}`
          );
          reject();
        }
        resolve(body);
      }
    );
  });
};

/**
 * @param WalletId
 * @returns Wallet Object
 */
const fetchWalletByWalletId = walletId => {
  logger.debug('fetchWalletByWalletId method started.');
  return new Promise((resolve, reject) => {
    request.post(
      `${databaseURL}/wallet/fetch-wallet-by-wallet-id`,
      {
        json: {
          WalletId: walletId
        }
      },
      (error, res, body) => {
        if (error) {
          logger.error(
            `Error ${error} occurred when fetching Wallet from UserID ${UserId}`
          );
          reject();
        }
        resolve(body);
      }
    );
  });
};

/**
 * @param WalletId
 * @param NewWalletObject
 * @returns echoes editted object
 */
const editWalletByWalletId = (walletId, NewWalletObject) => {
  logger.debug('editWalletByWalletId method started.');
  return new Promise((resolve, reject) => {
    request.post(
      `${databaseURL}/wallet/edit-wallet-by-wallet-id`,
      {
        json: {
          WalletId: walletId,
          NewWalletObject: NewWalletObject
        }
      },
      (error, res, body) => {
        if (error) {
          logger.error(
            `Error ${error} occurred when editting Wallet from WalletId ${walletId}`
          );
          reject();
        }
        resolve(body);
      }
    );
  });
};

/**
 * @param WalletId
 * @returns echoes deleted object
 */
const deleteWalletByWalletId = walletId => {
  logger.debug('deleteWalletByWalletId method started.');
  return new Promise((resolve, reject) => {
    request.post(
      `${databaseURL}/wallet/delete-wallet-by-wallet-id`,
      {
        json: {
          WalletId: walletId
        }
      },
      (error, res, body) => {
        if (error) {
          logger.error(
            `Error ${error} occurred when deleting Wallet from WalletId ${walletId}`
          );
          reject();
        }
        resolve(body);
      }
    );
  });
};

// Exports all methods
module.exports = {
  //Below is for User
  // addUserIntoDatabase,
  // fetchUserByUserId,
  // editUserByUserId,
  // deleteUserByUserId,
  // getUserIdByUserName,
  //below is for Wallet
  fetchWalletListByUserId,
  addWalletByUserId,
  fetchWalletByWalletId,
  editWalletByWalletId,
  deleteWalletByWalletId,
  getWalletIdByWalletNameAndUserId
  //below is for Events
  // fetchEventListByWalletId
  // addEventByWalletId,
  // fetchEventByEventId,
  // editEventByEventId,
  // deleteEventByEventId,
  // getEventIdByEventNameAndWalletIdAndUserId
  //below is others
};
