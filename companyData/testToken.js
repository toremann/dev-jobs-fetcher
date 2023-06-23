require("dotenv").config();
const getStoredToken = require("./getStoredToken");
const axios = require("axios");

async function testToken() {
  try {
    const token = await getStoredToken();
    const testUrl = `https://beta.proff.no/_next/data/${token}/search.json?q=test`;
    const response = await axios.get(testUrl);

    console.log(response.status); // Log the entire response object

    if (response.status === 404) {
      console.log("Invalid token");
      return false;
    }

    if (response.status === 200) {
      console.log("Test Response: ok!");
      return true;
    }
  } catch (error) {
    // console.log("Something went wrong in test:", error.status);
  }
}

testToken();

// module.exports = testToken;
