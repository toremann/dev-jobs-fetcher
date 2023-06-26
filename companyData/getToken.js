const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const axios = require("axios");

async function getToken() {
  console.log('Trying to get token..')
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        // Required for Docker version of Puppeteer
        "--no-sandbox",
        "--disable-setuid-sandbox",
        // This will write shared memory files into /tmp instead of /dev/shm,
        // because Docker’s default for /dev/shm is 64MB
        "--disable-dev-shm-usage",
        "--window-size=1652,996",
      ],
    });
    
    const page = await browser.newPage();

    await page.setRequestInterception(true);

    const desiredPortions = new Set();

    page.on("request", (interceptedRequest) => {
      const url = interceptedRequest.url();

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

    console.log("token:", token);

    const tokenData = { token };
    const jsonToken = JSON.stringify(tokenData);

    const filePath = path.resolve(__dirname, "token.json");
    fs.writeFileSync(filePath, jsonToken);

    // Test token
    const testUrl = `https://beta.proff.no/_next/data/${token}/search.json?q=test`;
    const response = await axios.get(testUrl);

    if (response.data.pageProps) {
      console.log("Test Response: ok!");
    } else {
      console.log(
        "Test Response failed: PageProps field is missing in the response."
      );
    }

    await browser.close();

    return token;
  } catch (error) {
    console.error("Error:", error);
  }
}

module.exports = getToken;