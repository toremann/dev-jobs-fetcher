const fs = require("fs");

async function readTokenFromFile() {
  try {
    const tokenData = fs.readFileSync("token.json");
    const token = JSON.parse(tokenData).token;
    console.log('stored token,', token)
    return token;
  } catch (error) {
    console.error("Error occurred while reading token from file:", error);
    return null;
  }
}

module.exports = readTokenFromFile;
