require("dotenv").config({ path: "../.env"});
const testToken = require('./testToken')
const getStoredToken = require('./getStoredToken')
const retrieveTokenFromDB = require('../db/retrieveToken')
const validateCompany = require('./validateCompany')
const axios = require('axios');

async function getEmployeeAmount(company, location) {
  console.log('getEmployeeAmount for: ', company, location);

  try {
    const token = await getStoredToken();
    const tokenFromDB = await retrieveTokenFromDB()

    // Testing
    console.log('path stored in DB:', tokenFromDB, 'path stored in local json:', token)

    const formattedCompany = validateCompany(company)

    const testUrl = `https://beta.proff.no/_next/data/${token}/search.json?q=${formattedCompany}`;

    const response = await axios.get(testUrl, {
      headers: {
        accept: "*/*",
      },
    });

    const companies = response.data.pageProps.companiesByName.companies;

    const filteredCompanies = companies.filter(company => {
      const companyLocation = company.visitorAddress && company.visitorAddress.postPlace;
      return companyLocation && companyLocation.toUpperCase() === location.toUpperCase();
    });

    if (filteredCompanies.length > 0) {
      const selectedCompany = filteredCompanies[0];
      const employeeAmount = selectedCompany.employees
      
      return employeeAmount
    } else {
      return `No match found for ${company} with the location: ${location}`
    }

  } catch (error) {
    console.log('getEmployeeAmount:', error.message);
  }
}

// getEmployeeAmount('Norsk Tipping AS', 'Hamar')

module.exports = getEmployeeAmount