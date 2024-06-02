const functions = require("./get-access-token");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

var data = [
  {
    message: {
      token: process.env.FIREBASE_TOKEN, // Access token from environment variable
      notification: {
        title: "Hello!",
        body: "you are amazing",
      },
      data: {
        youtubeID: "fdKnwB-6nj4",
      },
    },
  },
];

// Get access token and send message
var token = functions
  .getAccessToken()
  .then((result) => functions.sendMessage(result, data));
