const puppeteer = require('puppeteer');
const axios = require('axios');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Enable request interception
    await page.setRequestInterception(true);

    // Set to store unique desired portions
    const desiredPortions = new Set();

    // Listen for network requests
    page.on('request', (interceptedRequest) => {
      const url = interceptedRequest.url(); // Get the request URL

      // Extract the desired portion using regex
      const desiredPortionRegex = /\/_next\/static\/([^\/]+)/;
      const matches = url.match(desiredPortionRegex);
      if (matches) {
        const desiredPortion = matches[1];
        if (desiredPortion !== 'css' && desiredPortion !== 'chunks') {
          desiredPortions.add(desiredPortion); // Add to the set
        }
      }

      // Continue the request
      interceptedRequest.continue();
    });

    // Navigate to the website
    await page.goto('https://beta.proff.no');

    // Wait for the search input field to be visible and focus on it
    await page.waitForSelector('input[type="search"]');
    await page.focus('input[type="search"]');

    // Type and submit the search query (replace 'YourSearchQuery' with the actual search query)
    await page.keyboard.type('YourSearchQuery');
    await page.keyboard.press('Enter');

    // Wait for a certain amount of time (replace 3000 with the desired time in milliseconds)
    await page.waitForTimeout(3000);

    // Convert the set to a string
    const uniqueDesiredPortions = Array.from(desiredPortions).join(', ');

    // Print the unique desired portions
    console.log('Unique Desired Portion:', uniqueDesiredPortions);

    // Perform test call to the URL
    const testUrl = `https://beta.proff.no/_next/data/${uniqueDesiredPortions}/search.json?q=test`;
    const response = await axios.get(testUrl);

    // Print the response data
    console.log('Test Response:', response.data);

    // Close the browser
    await browser.close();
  } catch (error) {
    console.error('Error:', error);
  }
})();
