const fs = require("fs");
const path = require("path");

async function readTokenFromFile() {
  try {
    const filePath = path.resolve(__dirname, "token.json");
    const tokenData = fs.readFileSync(filePath);
    const token = JSON.parse(tokenData).token;
    console.log('stored token:', token);
    return token;
  } catch (error) {
    console.error("Error occurred while reading token from file:", error);
    return null;
  }
}

module.exports = readTokenFromFile;