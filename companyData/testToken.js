require("dotenv").config();
const readTokenFromFile = require("./getStoredToken");
const getNewToken = require("./getNewToken");
const axios = require("axios");

async function testToken() {
  try {
    const token = await readTokenFromFile();
    const testUrl = `https://beta.proff.no/_next/data/${token}/search.json?q=test`;
    const response = await axios.get(testUrl);

    if (response.status === 200) {
      console.log("testToken: Token is valid!");
      return token;
    }
  } catch (error) {
    console.log("testToken is invalid: Error", error.response.status);
    // handleInvalidToken();
  }
}

async function handleInvalidToken() {
  try {
    const newToken = await getNewToken();
    console.log('Fetching new token!')
    await testToken(newToken);
  } catch (error) {
    console.error("Failed to retrieve a new token:", error);
  }
}

// testToken()

// module.exports = testToken
