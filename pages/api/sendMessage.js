const axios = require("axios");
const sendMessageFunction = require("./getKey");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;

    try {
      // Get the access token
      const result = await sendMessageFunction.getAccessToken();
      // console.log(`The token is ${result}`);

      // Set up headers for the request
      const headers = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${result}`,
        },
      };

      // Send the message using the token
      const response = await axios.post(
        "https://fcm.googleapis.com/v1/projects/orphiusb-7f241/messages:send",
        message,
        headers
      );

      console.log("Message sent successfully");

      // Send a success response
      res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
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

      // Send an error response
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
