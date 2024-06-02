var admin = require("firebase-admin");
const { JWT } = require("google-auth-library");
var request = require("request");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

// Load environment variables from .env file

// console.log(JSON.parse(process.env.GOOGLE));

// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
// });

// getAccessToken();
module.exports = {
  getAccessToken: function () {
    return new Promise(function (resolve, reject) {
      const key = JSON.parse(process.env.GOOGLE);
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
