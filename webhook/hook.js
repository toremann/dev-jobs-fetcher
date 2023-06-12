require("dotenv").config();
const https = require("https");

const webhookURL = process.env.WEB_HOOK;

async function sendWebhook(payload) {
  try {
    const payloadString = JSON.stringify(payload);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const req = https.request(webhookURL, options, (res) => {
      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        console.log(`Webhook request sent with status code ${res.statusCode}`);
        console.log("Response:", responseData);
      });
    });

    req.on("error", (err) => {
      console.error("Error sending webhook request:", err);
    });

    req.write(payloadString);
    req.end();
  } catch (error) {
    console.error("Error preparing webhook request:", error);
  }
}

module.exports = sendWebhook;
