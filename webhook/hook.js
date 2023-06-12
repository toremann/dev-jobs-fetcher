require("dotenv").config();
const https = require("https");

const webhookURL = process.env.WEB_HOOK;

async function sendWebhook(payload) {
  const payloadString = JSON.stringify(payload);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": payloadString.length,
    },
  };

  const req = https.request(webhookURL, options, (res) => {
    console.log(`Webhook request sent with status code ${res.statusCode}`);
  });

  req.on("error", (err) => {
    console.error("Error sending webhook request:", err);
  });

  req.write(payloadString);
  req.end();
}

module.exports = sendWebhook;
