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

  sendMessage: function (token, message) {
    console.log(`the token is ${token}`);
    const headers = {
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },
    };
    console.log(message);
    axios
      .post(
        "https://fcm.googleapis.com/v1/projects/orphiusb-7f241/messages:send",
        message,
        headers
      )
      .then(async function (response) {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error:", error.message);
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error("Status:", error.response.status);
          console.error("Data:", error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("Request:", error.request);
        } else {
          // Something happened in setting up the request that triggered an error
          console.error("Error:", error.message);
        }
      });
  },
};
