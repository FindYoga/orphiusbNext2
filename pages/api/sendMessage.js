// call_function.js
const functions = require("./getKey");

(result) => functions.sendMessage(result, data);

export default function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;
    var token = functions.getAccessToken().then((result) => {
      console.dir(`the message is this ${message}`);
      return functions.sendMessage(result, message);
    });
    // Process the message as needed (e.g., save to database, send notification, etc.)
    // For now, we'll just log it to the console
    console.log("Received message:", message);

    // Send a success response
    res.status(200).json({ message: "Message received successfully" });
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
