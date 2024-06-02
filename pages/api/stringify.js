const dotenv = require("dotenv");
dotenv.config();

// Load environment variables from .env file

console.log(JSON.parse(process.env.GOOGLE));
