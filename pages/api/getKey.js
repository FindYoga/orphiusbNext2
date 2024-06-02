var admin = require("firebase-admin");
const { JWT } = require("google-auth-library");
var request = require("request");
const axios = require("axios");
var serviceAccount = require("./orphiusb-service-cred.json");

// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
// });

// getAccessToken();
module.exports = {
  getAccessToken: function () {
    return new Promise(function (resolve, reject) {
      const key = serviceAccount;
      const jwtClient = new JWT(
        key.client_email,
        null,
        key.private_key,
        ["https://www.googleapis.com/auth/firebase.messaging"],
        null
      );
      jwtClient.authorize(function (err, tokens) {
        if (err) {
          console.log(err);
          reject(err);
          return;
        }
        // console.log("hello");

        // console.log(`my token is ${tokens.access_token}`);
        // sendMessage(tokens.access_token);
        resolve(tokens.access_token);
      });
    });
  },
};
