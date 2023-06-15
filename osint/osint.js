const fetchToken = require('./getToken');
const axios = require('axios');

// Must match company and location
const company = "Sopra+Steria";
const location = "OSLO";

(async () => {
  try {
    const token = await fetchToken();

    console.log(`Using ${token} to fetch data..`);

    const testUrl = `https://beta.proff.no/_next/data/${token}/search.json?q=${company}`;

    console.log(testUrl);

    const response = await axios.get(testUrl, {
      headers: {
        accept: "*/*",
      },
    });

    const companies = response.data.pageProps.companiesByName.companies;

    const filteredCompanies = companies.filter(company => {
      console.log(`Finding company matching ${company} with location ${location}`)
      const companyLocation = company.visitorAddress && company.visitorAddress.postPlace;
      return companyLocation && companyLocation.toUpperCase() === location.toUpperCase();
    });

    if (filteredCompanies.length > 0) {
      console.log(filteredCompanies[0]);
    } else {
      console.log('No matching company found in the specified location.');
    }

  } catch (error) {
    console.log(error);
  }
})();
