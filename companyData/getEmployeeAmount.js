require("dotenv").config({ path: "../.env"});
const testToken = require('./testToken')
const getStoredToken = require('./getStoredToken')
const insertCompanyInfoToDB = require('../db/insertCompanyInfo')
const axios = require('axios');
const getAverageSalary = require('../lonn2023/getSalary')

async function getEmployeeAmount(company, location) {
  try {
    const token = await getStoredToken();

    const formattedCompany = company.replace(/\s+/g, '+');

    const testUrl = `https://beta.proff.no/_next/data/${token}/search.json?q=${formattedCompany}`;

    console.log(testUrl);

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
      const location = selectedCompany.location.county

      // const salary = await getAverageSalary(employeeAmount, location)

      // const results = {
      //   companyName: selectedCompany.name,
      //   location: selectedCompany.location.county,
      //   employeeAmount: selectedCompany.employees,
      //   salary: Math.floor(salary)
      // }

      // console.log('getCompanyData: ', results)

      // console.log('amount of employees:', employeeAmount)
      
      return employeeAmount
    } else {
      console.log(`No match found for ${company} with the location: ${location}`);
    }

  } catch (error) {
    console.log('getEmployeeAmount:', error.message);
  }
}

// getEmployeeAmount('Norsk Tipping AS', 'Hamar')

module.exports = getEmployeeAmount