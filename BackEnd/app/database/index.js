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

/**
 * @param WalletId
 * @returns echoes event list
 */
const fetchEventListByWalletId = walletId => {
  logger.debug('fetchEventListByWalletId method started.');
  return new Promise((resolve, reject) => {
    request.post(
      `${databaseURL}/event/fetch-event-list-by-wallet-id`,
      {
        json: {
          WalletId: walletId
        }
      },
      (error, res, body) => {
        if (error) {
          logger.error(
            `Error ${error} occurred when fetching event list from wallet Id ${walletId}`
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
 * @param eventObject={walletId, InflowOrOutflow, name, price, date, remarks}
 * @returns echoes added event
 */
const addEventByWalletId = (walletId, eventObject) => {
  logger.debug('addEventByWalletId method started.');
  return new Promise((resolve, reject) => {
    request.post(
      `${databaseURL}/event/add-event-by-wallet-id`,
      {
        json: {
          WalletId: walletId,
          EventName: eventObject.name,
          InflowOrOutflow: eventObject.InflowOrOutflow,
          Type: eventObject.type,
          Name: eventObject.name,
          Price: eventObject.price,
          Date: eventObject.date,
          Remarks: eventObject.remarks
        }
      },
      (error, res, body) => {
        if (error) {
          logger.error(
            `Error ${error} occurred when adding event to wallet Id ${walletId}`
          );
          reject();
        }
        resolve(body);
      }
    );
  });
};

/**
 * @param EventId
 * @returns event object
 */
const fetchEventByEventId = eventId => {
  logger.debug('fetchEventByEventId method started.');
  return new Promise((resolve, reject) => {
    request.post(
      `${databaseURL}/event/fetch-event-by-event-id`,
      {
        json: {
          EventId: eventId
        }
      },
      (error, res, body) => {
        if (error) {
          logger.error(
            `Error ${error} occurred when fetching event from eventId ${eventId}`
          );
          reject();
        }
        resolve(body);
      }
    );
  });
};

/**
 * @param eventId, neweventObject
 * @returns echoes event object updated
 */
const editEventByEventId = (eventId, newEventObject) => {
  logger.debug('editEventByEventId method started.');
  return new Promise((resolve, reject) => {
    request.post(
      `${databaseURL}/event/edit-event-by-event-id`,
      {
        json: {
          EventId: eventId,
          EventName: newEventObject.name,
          InflowOrOutflow: newEventObject.InflowOrOutflow,
          Type: newEventObject.type,
          Name: newEventObject.name,
          Price: newEventObject.price,
          Date: newEventObject.date,
          Remarks: newEventObject.remarks
        }
      },
      (error, res, body) => {
        if (error) {
          logger.error(
            `Error ${error} occurred when editting event from eventId ${eventId}`
          );
          reject();
        }
        resolve(body);
      }
    );
  });
};

/**
 * @param eventId
 * @returns echoes deleted object
 */
const deleteEventByEventId = eventId => {
  logger.debug('deleteEventByEventId method started.');
  return new Promise((resolve, reject) => {
    request.post(
      `${databaseURL}/event/delete-event-by-event-id`,
      {
        json: {
          EventId: eventId
        }
      },
      (error, res, body) => {
        if (error) {
          logger.error(
            `Error ${error} occurred when deleting event, eventId ${eventId}`
          );
          reject();
        }
        resolve(body);
      }
    );
  });
};

/**
 * @param (eventName, walletId, userId)
 * @returns echoes deleted object
 */
const getEventIdByEventNameAndWalletIdAndUserId = (
  eventName,
  walletId,
  userId
) => {
  logger.debug('getEventIdByEventNameAndWalletIdAndUserId method started.');
  return new Promise((resolve, reject) => {
    request.post(
      `${databaseURL}/event/get-event-id-by-event-name-and-wallet-id-and-user-id`,
      {
        json: {
          walletId: walletId,
          eventName: eventName,
          userId: userId
        }
      },
      (error, res, body) => {
        if (error) {
          logger.error(
            `Error ${error} occurred when getting eventId with eventname` +
              ` ${eventName} WalletId ${walletId} and UserId ${userId}`
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
  getWalletIdByWalletNameAndUserId,
  //below is for Events
  fetchEventListByWalletId,
  addEventByWalletId,
  fetchEventByEventId,
  editEventByEventId,
  deleteEventByEventId,
  getEventIdByEventNameAndWalletIdAndUserId
  //below is others
};
