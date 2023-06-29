require("dotenv").config();
const fs = require("fs");
const path = require("path")
const puppeteer = require("puppeteer");
const insertTokenToDB = require('../db/insertToken')

// if token is invalid, then we use this function to get a new token.

async function getNewToken() {
  console.log('Trying to get a fresh token..')
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--window-size=1652,996",
      ],
    });

    const page = await browser.newPage();

    await page.setRequestInterception(true);

    const desiredPortions = new Set();

    page.on("request", (interceptedRequest) => {
      const url = interceptedRequest.url();

      // intercept request and get correct path
      const desiredPortionRegex = /\/_next\/static\/([^\/]+)/;
      const matches = url.match(desiredPortionRegex);
      if (matches) {
        const desiredPortion = matches[1];
        if (desiredPortion !== "css" && desiredPortion !== "chunks") {
          desiredPortions.add(desiredPortion);
        }
      }
      interceptedRequest.continue();
    });

    await page.goto("https://beta.proff.no");

    await page.waitForSelector('input[type="search"]');
    await page.focus('input[type="search"]');

    await page.keyboard.type("YourSearchQuery");
    await page.keyboard.press("Enter");

    await page.waitForTimeout(3000);

    const token = Array.from(desiredPortions).join(", ");

    // for testing, write the token to file (later write it to db)
    insertTokenToDB(token)
    
    // write to local
    const tokenData = { token };
    const jsonToken = JSON.stringify(tokenData);

    const filePath = path.join(__dirname, "token.json");

    fs.writeFileSync(filePath, jsonToken);

    await browser.close();

    return token;
  } catch (error) {
    console.error("Error:", error);
  }
}

// getNewToken()

module.exports = getNewToken;