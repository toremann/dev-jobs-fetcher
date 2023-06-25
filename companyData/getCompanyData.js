require("dotenv").config({ path: "../.env"});
const testToken = require('./testToken')
const insertCompanyInfoToDB = require('../db/insertCompanyInfo')
const axios = require('axios');
const getAverageSalary = require('../lonn2023/getSalary')

async function getCompanyData(company, location) {
  try {
    const token = await testToken();

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
      const companyLocation = company.visitorAddress && company.visitorAddress.postPlace;
      return companyLocation && companyLocation.toUpperCase() === location.toUpperCase();
    });

    if (filteredCompanies.length > 0) {
      const selectedCompany = filteredCompanies[0];
      // console.log(selectedCompany);
      // console.log('Antall ansatte:', selectedCompany.employees)
      const employee = selectedCompany.employees
      const location = selectedCompany.location.county

      const salary = await getAverageSalary(employee, location)

      const results = {
        companyName: selectedCompany.name,
        location: selectedCompany.location.county,
        employeeAmount: selectedCompany.employees,
        salary: Math.floor(salary)
      }

      console.log(results)
      
      // await insertCompanyInfoToDB(selectedCompany);
      // console.log("Data inserted into PostgreSQL database!");
    } else {
      console.log('No matching company found in the specified location.');
    }

  } catch (error) {
    console.log('getCompanyData:', error.message);
  }
}

getCompanyData('Kulturdirektoratet', 'Oslo')
